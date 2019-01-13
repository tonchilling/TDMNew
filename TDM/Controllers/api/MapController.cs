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
        private TDAssetRespository repos = null;
        SearchMap searchMap = null;
        protected MapController()
        {
            tdmEntities = new TDManagementEntities();
            tdaEntities = new TDASSETEntities();
            cmEntities = new commonEntities();
             repos = new TDAssetRespository();
            tdmEntities.Configuration.ProxyCreationEnabled = false;
            tdaEntities.Configuration.ProxyCreationEnabled = false;
            cmEntities.Configuration.ProxyCreationEnabled = false;


        }


        [HttpGet]
        public IHttpActionResult GetProvinces()
        {
            
            return Json(tdaEntities.PROVINCEs.Select(p => new { ID = p.PRO_C, Name = ((p.NAME_T != null) ? p.NAME_T.Replace("จ.",""): "") }).OrderBy(o => o.Name));

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
            return Json(tdaEntities.AMPHOEs.Where(ap => ap.PRO_C == id.ToString()).Select(s => new { ID = s.DIS_C, Name = ((s.NAME_T != null) ? s.NAME_T.Replace("อ.", "") : "") }).ToList());

            //return Json(cmEntities.TB_MAS_AMPHUR.Where(p => p.PROVINCE_SEQ == id).OrderBy(o => o.AMPHUR_NAME_TH));
        }

        [HttpGet]
        public IHttpActionResult GetDistrictsByProvince(int LocationType,string id)
        {
            searchMap = new SearchMap();
            searchMap.LocationType = (LocationType)LocationType;
            searchMap.Code = id;
            var provinces = repos.GetAMPHOE(searchMap);

            return Json(provinces.Select(p => new { ID = p.DIS_C, Name = p.ON_DIS_THA }));

           // return Json(tdaEntities.AMPHOEs.Where(ap => ap.PRO_C == id.ToString()).Select(s => new { ID = s.DIS_C, Name = ((s.NAME_T != null) ? s.NAME_T.Replace("อ.", "") : "") }).ToList());

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
            return Json(tdaEntities.TAMBOLs.Where(t => t.DIS_C == id.ToString()).Select(s => new { ID = s.SUB_C, Name = ((s.NAME_T != null) ? s.NAME_T.Replace("ต.", "") : "") }));


            //return Json(cmEntities.TB_MAS_TAMBOL.Where(p => p.AMPHUR_SEQ == id).OrderBy(o => o.TAMBOL_NAME_TH));

        }

        public IHttpActionResult GetSubDistrictsByDistrict(int LocationType,string id)
        {

            searchMap = new SearchMap();
            searchMap.LocationType = (LocationType)LocationType;
            searchMap.Code = id;
            var provinces = repos.GetTAMBOL(searchMap);

            return Json(provinces.Select(p => new { ID = p.SUB_C, Name = p.ON_SUB_THA }));



         //   return Json(tdaEntities.TAMBOLs.Where(t => t.DIS_C == id.ToString()).Select(s => new { ID = s.SUB_C, Name = ((s.NAME_T != null) ? s.NAME_T.Replace("ต.", "") : "") }));


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

                if (id == 1)
                {
                    cmd.CommandText = $@"select PRO_C,NAME_T FROM province WHERE pro_c IN
                                    (
                                        SELECT AD_CHANGWA FROM MUNISAN where AD_REGION!='' AND AD_REGION = {id} Group By AD_REGION,AD_CHANGWA
                                    ) 
                                     union all select PRO_C,NAME_T FROM province WHERE pro_c='10'";
                }
                else {
                    cmd.CommandText = $@"select PRO_C,NAME_T FROM province WHERE pro_c IN
                                    (
                                        SELECT AD_CHANGWA FROM MUNISAN where AD_REGION!='' AND AD_REGION = {id} Group By AD_REGION,AD_CHANGWA
                                    )";
                }

                string name = "";
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        name = reader.GetString(1);
                        provinces.Add(new PROVINCE()
                        {
                            PRO_C = reader.GetString(0),
                            NAME_T = ((name != null) ? name.Replace("จ.", "") : ""),
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
        public IHttpActionResult GetProvincesByRegion(int LocationType,string id)
        {

            searchMap = new SearchMap();
            searchMap.LocationType = (LocationType)LocationType;
            searchMap.Code = id;
            var provinces = repos.GetProvince(searchMap);

            return Json(provinces.Select(p => new { ID = p.PRO_C, Name = p.ON_PRO_THA }));
        }


        [HttpGet]
        public IHttpActionResult GetProvinceShapeByID(string id)
        {
            try
            {
                //var result = tdaEntities.PROVINCEs.Where(p => p.PRO_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault();

                var result = GetMapInfo(SetionType.ProviceByID, id).FirstOrDefault();

                return Json(result);
                //return Json(result, jsonSetting);


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
                /*
                var result = tdaEntities.AMPHOEs.Where(x => x.DIS_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault();
                //return Json(, jsonSetting);

                return Json(GetMapInfo(new
                {
                    Name = id,
                    Shape = result.SHAPE

                }), jsonSetting);
                */

                var result = GetMapInfo(SetionType.AmphurByID, id).FirstOrDefault();


                return Json(result);

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
                /*
                var result = tdaEntities.TAMBOLs.Where(x => x.SUB_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault();

                //return Json(result, jsonSetting);

                return Json(GetMapInfo(new
                {
                    Name = id,
                    Shape = result.SHAPE

                }), jsonSetting);
                */

                var result = GetMapInfo(SetionType.TumbolByID, id);


                return Json(result);

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

        private string DisplayPopupName(EstimateData data, SetionType type)
        {
            string value = "";

            switch (type)
            {
                case SetionType.Region: value = data.DisplayName; break;
                case SetionType.Provice: value = data.DisplayName; break;
                case SetionType.Amphur: value = data.DisplayName; break;
                case SetionType.Tumbol: value = data.DisplayName; break;
            }

            return value;

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

                    Name = r.DisplayName,

                    ParcelPrice = DecimalHelper.ToDecimal(r.ParcelPrice, -1),
                    ParcelPriceMin = DecimalHelper.ToDecimal(r.ParcelPriceMin, -1),
                    ParcelPriceMax = DecimalHelper.ToDecimal(r.ParcelPriceMax, -1),
                    ParcelPriceAvg = DecimalHelper.ToDecimal(r.ParcelPriceAvg, -1),

                    MarketPrice = DecimalHelper.ToDecimal(r.MarketPrice, -1),
                    MarketPriceMin = DecimalHelper.ToDecimal(r.MarketPriceMin, -1),
                    MarketPriceMax = DecimalHelper.ToDecimal(r.MarketPriceMax, -1),
                    MarketPriceAvg = DecimalHelper.ToDecimal(r.MarketPriceAvg, -1),
                    LATITUDE = r.LATITUDE,
                    LONGITUDE=r.LONGITUDE,
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
    class DecimalHelper
    {
        public static decimal ToDecimal(string value,decimal defaultValue)
        {
            decimal result = defaultValue;
            return (value!=null && decimal.TryParse(value,out result))?result : defaultValue;
        }
    }


}