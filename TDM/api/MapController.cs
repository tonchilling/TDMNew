using AutoMapper;
using Microsoft.SqlServer.Types;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Spatial;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TDM.Models;
using TDM.Repositories;

namespace TDM.Controllers.api
{
    public class MapController : ApiController
    {
        private JsonSerializerSettings jsonSetting = JsonHelper.createJsonSetting();
        private TDManagementEntities tdmEntities = null;
        private TDASSETEntities tdaEntities = null;
        private commonEntities cmEntities = null;

        protected MapController()
        {
            tdmEntities = new TDManagementEntities();
            tdaEntities = new TDASSETEntities();
            cmEntities = new commonEntities();
            tdmEntities.Configuration.ProxyCreationEnabled = false;
            tdaEntities.Configuration.ProxyCreationEnabled = false;
            cmEntities.Configuration.ProxyCreationEnabled = false;


        }


        [HttpGet]
        public IHttpActionResult GetProvinces()
        {

            return Json(tdaEntities.PROVINCEs.Select(p => new { ID = p.PRO_C, Name = p.NAME_T }).OrderBy(o => o.Name));

            /* 
            var provinces = VirtualDb.GetProvinces();
            return Json(provinces.Where(p => p.PROVINCE_SEQ != 0).OrderBy(o => o.PROVINCE_NAME_TH));
            */
            //return Json(VirtualDb.GetProvinces().OrderBy(o => o.ON_PRO_THA));
        }

        [HttpGet]
        public IHttpActionResult GetDistricts()
        {
           // var districts = VirtualDb.GetDistricts();
          //  return Json(districts.OrderBy(o => o.AMPHUR_NAME_TH));

            return Json(cmEntities.TB_MAS_AMPHUR.OrderBy(o => o.AMPHUR_NAME_TH));
        }

        [HttpGet]
        public IHttpActionResult GetDistrictsByProvince(int id)
        {
            return Json(tdaEntities.AMPHOEs.Where(ap => ap.PRO_C == id.ToString()).Select(s => new { ID = s.DIS_C, Name = s.NAME_T }).ToList());

            //return Json(cmEntities.TB_MAS_AMPHUR.Where(p => p.PROVINCE_SEQ == id).OrderBy(o => o.AMPHUR_NAME_TH));
        }


        //[Route("api/channels/{code}/{search}")]
        public IHttpActionResult GetSubDistricts()
        {
            /*
            var xml = Serialize(cmEntities.TB_MAS_TAMBOL.ToList());
            File.WriteAllText(@"C:\inetpub\wwwroot\SuthamPunsung-tdmanagement-e24c590fc64a\TDM\xml\subDistricts.xml", xml);
*/


            return Json(cmEntities.TB_MAS_TAMBOL.OrderBy(o => o.TAMBOL_NAME_TH));

        }

        public IHttpActionResult GetSubDistrictsByDistrict(int id)
        {
            return Json(tdaEntities.TAMBOLs.Where(t => t.DIS_C == id.ToString()).Select(s => new { ID = s.SUB_C, Name = s.NAME_T }));


            //return Json(cmEntities.TB_MAS_TAMBOL.Where(p => p.AMPHUR_SEQ == id).OrderBy(o => o.TAMBOL_NAME_TH));

        }

        private List<PROVINCE> GetProvincesByRegionId(int id)
        {
            SqlConnection conn = null;
            SqlCommand cmd = null;

            List<PROVINCE> provinces = new List<PROVINCE>(0);
            try
            {

                conn = new SqlConnection(tdaEntities.Database.Connection.ConnectionString);
                conn.Open();

                cmd = conn.CreateCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = $@"select PRO_C,NAME_T FROM province WHERE pro_c IN
                                    (
                                        SELECT AD_CHANGWA FROM MUNISAN where AD_REGION!='' AND AD_REGION = {id} Group By AD_REGION,AD_CHANGWA
                                    )";

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        provinces.Add(new PROVINCE()
                        {
                            PRO_C = reader.GetString(0),
                            NAME_T = reader.GetString(1),
                        });



                    }
                }

            }

            finally
            {
                if (conn != null && conn.State == System.Data.ConnectionState.Open)
                {
                    conn.Close();
                }
            }

            return provinces;
        }

        [HttpGet]
        public IHttpActionResult GetProvincesByRegion(int id)
        {

            var provinces = GetProvincesByRegionId(id);

            return Json(provinces.Select(p => new { ID = p.PRO_C, Name = p.NAME_T }));
        }


        [HttpGet]
        public IHttpActionResult GetProvinceShapeByID(string id)
        {
            try
            {
                var result = tdaEntities.PROVINCEs.Where(p => p.PRO_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault();

                //return Json(result, jsonSetting);
                return Json(GetMapInfo(new
                {
                    Name = id,
                    Shape = result.SHAPE

                }), jsonSetting);

            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetProvinceShapeByRegion(string id)
        {
            try
            {
                /*
                var provinceIds = GetProvincesByRegionId(int.Parse(id)).Select(p => p.PRO_C).ToArray();

                return Json(tdaEntities.PROVINCEs.Where(p => provinceIds.Contains(p.PRO_C)).ToList().Select(x => new SHAPE_ViewModel(x.Shape)), jsonSetting);
                */

                var result = GetMapInfo(SetionType.Region, id);
                

                return Json(result);

            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        private List<Models.ViewModels.MAP_ViewModel> GetRandomColor(List<Models.ViewModels.MAP_ViewModel> target)
        {

            string[] color = { "red" , "green", "yellow" };
            int index = 0;
            target.ForEach(t =>
            {
                t.MapStructure.MarketDrawingCode = t.MapStructure.ParcelDrawingCode = color[index];
                index++;
                if (index > 2)
                {
                    index = 0;
                }

            });
            return target;
        }
       
        public IHttpActionResult GetDistrictShapeByID(string id)
        {
            try
            {
                var result = tdaEntities.AMPHOEs.Where(x => x.DIS_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault();
                //return Json(, jsonSetting);

                return Json(GetMapInfo(new
                {
                    Name = id,
                    Shape = result.SHAPE

                }), jsonSetting);


            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetDistrictShapeByProvince(string id)
        {
            try
            {
                //return Json(tdaEntities.AMPHOEs.Where(x => x.PRO_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)), jsonSetting);

                var result = GetMapInfo(SetionType.Provice, id);


                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetSubDistrictShapeByID(string id)
        {
            try
            {

                var result = tdaEntities.TAMBOLs.Where(x => x.SUB_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault();

                //return Json(result, jsonSetting);

                return Json(GetMapInfo(new
                {
                    Name = id,
                    Shape = result.SHAPE

                }), jsonSetting);

            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetSubDistrictShapeByDistrict(string id)
        {
            try
            {
                /*
                var result = tdaEntities.TAMBOLs.Where(x => x.DIS_C == id).ToList();

                return Json(result.Select(x => new SHAPE_ViewModel(x.Shape)), jsonSetting);
                */

                var result = GetMapInfo(SetionType.Amphur, id);


                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        private Models.ViewModels.MAP_ViewModel GetMapInfo(dynamic target)
        {
            var result = new Models.ViewModels.MAP_ViewModel()
            {
                Name = target.Name,
                MapStructure = new Models.ViewModels.MapStructureInfo()
                {
                    ParcelDrawingCode = "",
                    MarketDrawingCode = "",

                    Shape = target.Shape
                }
            };

            return GetRandomColor((new Models.ViewModels.MAP_ViewModel[] { result }).ToList()).First();

        }


        private List<Models.ViewModels.MAP_ViewModel> GetMapInfo(SetionType type, string code)
        {
            List<Models.ViewModels.MAP_ViewModel> result = new List<Models.ViewModels.MAP_ViewModel>(0);
            var repos = new TDAssetRespository();

            var searchResult = repos.GetPrice(new SearchMap()
            {
                SectionType = type,
                Code = code
            });

            if (searchResult != null && searchResult.Count() > 0)
            {
                result = searchResult.Select(r => new TDM.Models.ViewModels.MAP_ViewModel()
                {
                    Name = r.ProviceName,

                    MapStructure = new Models.ViewModels.MapStructureInfo()
                    {
                        ParcelDrawingCode = r.ParcelColor,
                        MarketDrawingCode = r.MarketColor,

                        Shape = r.Shape.ToString()

                    }
                }).ToList();

            }

            return GetRandomColor(result);
        }

    }
}