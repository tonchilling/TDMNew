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
using TDM.Models.Utils;
namespace TDM.Controllers.api
{
    public class MapController : ApiController
    {
        private System.Globalization.CultureInfo _locale = new System.Globalization.CultureInfo("en-US");

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
            
            return Json(tdaEntities.PROVINCEs.Select(p => new { ID = p.PRO_C, Name = p.NAME_T.Replace("จ.","") }).OrderBy(o => o.Name));

            /* 
            var provinces = VirtualDb.GetProvinces();
            return Json(provinces.Where(p => p.PROVINCE_SEQ != 0).OrderBy(o => o.PROVINCE_NAME_TH));
            */
            //return Json(VirtualDb.GetProvinces().OrderBy(o => o.NAME_T));
        }

        [HttpGet]
        public IHttpActionResult GetProvinceById(int id)
        {

            return Json(tdaEntities.PROVINCEs.Where(p=>p.PRO_C== id.ToString()).Select(p => new { ID = p.PRO_C, Name = p.NAME_T,Shape=p.Shape.AsText() }));

            /* 
            var provinces = VirtualDb.GetProvinces();
            return Json(provinces.Where(p => p.PROVINCE_SEQ != 0).OrderBy(o => o.PROVINCE_NAME_TH));
            */
            //return Json(VirtualDb.GetProvinces().OrderBy(o => o.NAME_T));
        }

        [HttpGet]
        public IHttpActionResult GetDistrictsById(int provinceId,int id)
        {

            return Json(tdaEntities.AMPHOEs.Where(p => p.PRO_C == provinceId.ToString() && p.DIS_C== id.ToString()).Select(p => new { ID = p.DIS_C, Name = p.NAME_T, Shape = p.Shape.AsText() }));

            /* 
            var provinces = VirtualDb.GetProvinces();
            return Json(provinces.Where(p => p.PROVINCE_SEQ != 0).OrderBy(o => o.PROVINCE_NAME_TH));
            */
            //return Json(VirtualDb.GetProvinces().OrderBy(o => o.NAME_T));
        }

        [HttpGet]
        public IHttpActionResult GetSubDistrictsById(int provinceId, int amphureId,int id)
        {

            return Json(tdaEntities.TAMBOLs.Where(p => p.PRO_C == provinceId.ToString()
                                                          && p.DIS_C == amphureId.ToString()
                                                          && p.SUB_C==id.ToString()).Select(p => new { ID = p.SUB_C, Name = p.NAME_T, Shape = p.Shape.AsText() }));

            /* 
            var provinces = VirtualDb.GetProvinces();
            return Json(provinces.Where(p => p.PROVINCE_SEQ != 0).OrderBy(o => o.PROVINCE_NAME_TH));
            */
            //return Json(VirtualDb.GetProvinces().OrderBy(o => o.NAME_T));
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
            return Json(tdaEntities.AMPHOEs.Where(ap => ap.PRO_C == id.ToString()).Select(s => new { ID = s.DIS_C, Name = s.NAME_T,Shape=s.Shape }).OrderBy(o => o.Name));

            //return Json(cmEntities.TB_MAS_AMPHUR.Where(p => p.PROVINCE_SEQ == id).OrderBy(o => o.AMPHUR_NAME_TH));
        }

        [HttpGet]
        public IHttpActionResult GetDistrictsByProvince(int LocationType,string id)
        {
            searchMap = new SearchMap();
            searchMap.LocationType = (LocationType)LocationType;
            searchMap.Code = id;
            var provinces = repos.GetAMPHOE(searchMap);

            return Json(provinces.Select(p => new { ID = p.DIS_C, Name = p.NAME_T }).OrderBy(o => o.Name));

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


            return Json(cmEntities.TB_MAS_TAMBOL.OrderBy(o => o.TAMBOL_NAME_TH).OrderBy(o => o.TAMBOL_NAME_TH));

        }

        public IHttpActionResult GetSubDistrictsByDistrict(int id)
        {
            return Json(tdaEntities.TAMBOLs.Where(t => t.DIS_C == id.ToString()).Select(s => new { ID = s.SUB_C, Name = s.NAME_T }).GroupBy(o=>o));


            //return Json(cmEntities.TB_MAS_TAMBOL.Where(p => p.AMPHUR_SEQ == id).OrderBy(o => o.TAMBOL_NAME_TH));

        }

        public IHttpActionResult GetSubDistrictsByDistrict(int LocationType,string id)
        {

            searchMap = new SearchMap();
            searchMap.LocationType = (LocationType)LocationType;
            searchMap.Code = id;
            var provinces = repos.GetTAMBOL(searchMap);

            return Json(provinces.Select(p => new { ID = p.SUB_C, Name = p.NAME_T }).OrderBy(o => o.Name));



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
                    cmd.CommandText = $@" select * from (select PRO_C,NAME_T,NAME_T Name  FROM province WHERE pro_c IN
                                    (
                                        SELECT AD_CHANGWA FROM MUNISAN where AD_REGION!='' AND AD_REGION = {id} Group By AD_REGION,AD_CHANGWA
                                    ) 
                                     union all select PRO_C,NAME_T FROM province WHERE pro_c='10' ) pro order by Name asc";
                }
                else {
                    cmd.CommandText = $@" select PRO_C,NAME_T ,NAME_T Name FROM province WHERE pro_c IN
                                    (
                                        SELECT AD_CHANGWA FROM MUNISAN where AD_REGION!='' AND AD_REGION = {id} Group By AD_REGION,AD_CHANGWA
                                    ) order by NAME_T";
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
            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("th-TH");
            return Json(provinces); 
           // return Json(provinces.Select(p => new { ID = p.PRO_C, Name = p.NAME_T.Replace("จ.", "") }).OrderBy(o => o.Name, StringComparer.CurrentCulture));
        }

        [HttpGet]
        public IHttpActionResult GetProvincesByRegion(int LocationType,string id)
        {

            searchMap = new SearchMap();
            searchMap.LocationType = (LocationType)LocationType;
            searchMap.Code = id;


            var provinces = (id == null || id == "") ? tdaEntities.PROVINCEs.Select(p => new { PRO_C = p.PRO_C, NAME_T = p.NAME_T }).ToList() : repos.GetProvince(searchMap).Select(p => new { PRO_C = p.PRO_C, NAME_T = p.NAME_T });

            return Json(provinces.Select(p => new { ID = p.PRO_C, Name = p.NAME_T.Replace("จ.", "") }).OrderBy(o => o.Name));
        }

        

        [HttpGet]
        //[Route("api/Map/GetProvinceShapeByID/{id}/{areaType}/{costEstUnitType}/{costEstMin}/{costEstMax}")]
        public IHttpActionResult GetProvinceShapeByID(string id,string priceType, string areaType,string costEstUnitType,string costEstMin,string costEstMax, string startDate, string endDate)
        {
            try
            {
                
                //var result = tdaEntities.PROVINCEs.Where(p => p.PRO_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)).FirstOrDefault();

                var result = GetMapInfo(new MapSearchCriteria()
                {
                    ID = id,
                    PriceType = priceType,
                    Type = SetionType.Provice,
                    AreaType = areaType,
                    CostEstUnitType = costEstUnitType,
                    CostEstMax = costEstMax,
                    CostEstMin = costEstMin,


                    StartDate = (String.IsNullOrEmpty(startDate)) ? (DateTime?)null : DateTime.Parse(startDate, _locale),
                    EndDate = (String.IsNullOrEmpty(endDate)) ? (DateTime?)null : DateTime.Parse(startDate, _locale),
                });

                return Json(result);
                //return Json(result, jsonSetting);


            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetProvinceShapeByRegion(string id, string priceType, string areaType, string costEstUnitType, string costEstMin, string costEstMax, string startDate, string endDate)
        {
            try
            {


                var result = GetMapInfo(new MapSearchCriteria()
                {
                    ID = id,
                    PriceType = priceType,
                    Type = SetionType.Region,
                    AreaType = areaType,
                    CostEstUnitType = costEstUnitType,
                    CostEstMax = costEstMax,
                    CostEstMin = costEstMin,


                    StartDate = (!String.IsNullOrEmpty(startDate))?DateTime.Parse(startDate, _locale): (DateTime?)null,
                    EndDate = (!String.IsNullOrEmpty(endDate)) ? DateTime.Parse(endDate, _locale) : (DateTime?)null,
                });
                

                return Json(result);

            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        private List<Models.ViewModels.MAP_ViewModel> GetRandomColor(List<Models.ViewModels.MAP_ViewModel> target)
        {
            /*
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

            });*/
            return target;
        }
       
        public IHttpActionResult GetDistrictShapeByID(string id, string priceType, string areaType, string costEstUnitType, string costEstMin, string costEstMax, string startDate, string endDate)
        {
            try
            {
                
                var result = GetMapInfo(new MapSearchCriteria()
                {
                    ID = id,
                    PriceType = priceType,
                    Type = SetionType.Amphur,
                    AreaType = areaType,
                    CostEstUnitType = costEstUnitType,
                    CostEstMax = costEstMax,
                    CostEstMin = costEstMin,


                    StartDate = (!String.IsNullOrEmpty(startDate)) ? DateTime.Parse(startDate, _locale) : (DateTime?)null,
                    EndDate = (!String.IsNullOrEmpty(endDate)) ? DateTime.Parse(endDate, _locale) : (DateTime?)null,
                });

                return Json(result);

            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetDistrictShapeByProvince(string id, string priceType, string areaType, string costEstUnitType, string costEstMin, string costEstMax, string startDate, string endDate)
        {
            try
            {
                //return Json(tdaEntities.AMPHOEs.Where(x => x.PRO_C == id).ToList().Select(x => new SHAPE_ViewModel(x.Shape)), jsonSetting);

                var result = GetMapInfo(new MapSearchCriteria()
                {
                    ID = id,
                    PriceType = priceType,
                    Type = SetionType.Provice,
                    AreaType = areaType,
                    CostEstUnitType = costEstUnitType,
                    CostEstMax = costEstMax,
                    CostEstMin = costEstMin,

                    StartDate = (!String.IsNullOrEmpty(startDate)) ? DateTime.Parse(startDate, _locale) : (DateTime?)null,
                    EndDate = (!String.IsNullOrEmpty(endDate)) ? DateTime.Parse(endDate, _locale) : (DateTime?)null,
                });


                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetSubDistrictShapeByID(string id, string priceType, string areaType, string costEstUnitType, string costEstMin, string costEstMax, string startDate, string endDate)
        {
            try
            {
                

                var result = GetMapInfo(new MapSearchCriteria()
                {
                    ID = id,
                    PriceType = priceType,
                    Type = SetionType.TumbolByID,
                    AreaType = areaType,
                    CostEstUnitType = costEstUnitType,
                    CostEstMax = costEstMax,
                    CostEstMin = costEstMin,

                    StartDate = (String.IsNullOrEmpty(startDate)) ? (DateTime?)null : DateTime.Parse(startDate, _locale),
                    EndDate = (String.IsNullOrEmpty(endDate)) ? (DateTime?)null : DateTime.Parse(startDate, _locale),
                });


                return Json(result);

            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetSubDistrictShapeByDistrict(string id, string priceType, string areaType, string costEstUnitType, string costEstMin, string costEstMax, string startDate, string endDate)
        {
            try
            {
                /*
                var result = tdaEntities.TAMBOLs.Where(x => x.DIS_C == id).ToList();

                return Json(result.Select(x => new SHAPE_ViewModel(x.Shape)), jsonSetting);
                */

                var result = GetMapInfo(new MapSearchCriteria()
                {
                    ID = id,
                    PriceType = priceType,
                    Type = SetionType.Amphur,
                    AreaType = areaType,
                    CostEstUnitType = costEstUnitType,
                    CostEstMax = costEstMax,
                    CostEstMin = costEstMin,

                    StartDate = (String.IsNullOrEmpty(startDate)) ? (DateTime?)null : DateTime.Parse(startDate, _locale),
                    EndDate = (String.IsNullOrEmpty(endDate)) ? (DateTime?)null : DateTime.Parse(startDate, _locale),
                });


                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        [HttpGet]
        public IHttpActionResult GetParcelShapeByChanode(string id, string priceType, string AreaType, string ChanodeNo)
        {
            try
            {
                /*
                var result = tdaEntities.TAMBOLs.Where(x => x.DIS_C == id).ToList();

                return Json(result.Select(x => new SHAPE_ViewModel(x.Shape)), jsonSetting);
                */

                var result = GetMapInfo(new MapSearchCriteria()
                {
                    ID = id,
                    PriceType = priceType,
                    Type = SetionType.ChanodeID,
                    AreaType= AreaType,
                    ChanodeNo = ChanodeNo

                });


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

        /// <summary>
        /// execute 
        /// </summary>
        /// <param name="criteria"></param>
        /// <param name="result"></param>
        /// <returns></returns>
        private List<Models.ViewModels.MAP_ViewModel> ExecuteClientCriteria(MapSearchCriteria criteria,List<Models.ViewModels.MAP_ViewModel> result)
        {
            return result;
            if(result!=null && result.Any())
            {
                if((!string.IsNullOrEmpty(criteria.CostEstMin)) && (!string.IsNullOrEmpty(criteria.CostEstMax)))
                {
                    var priceStart = decimal.Parse(criteria.CostEstMin);
                    var priceEnd = decimal.Parse(criteria.CostEstMax);

                    if (criteria.PriceType == "0")
                    {
                        result = result.Where(r => r.ParcelPrice >= priceStart &&
                                                   r.ParcelPrice <= priceEnd &&
                                                   r.MarketPrice >= priceStart &&
                                                   r.MarketPrice <= priceEnd 
                        ).ToList();
                    } 
                    else if (criteria.PriceType == "1")
                    {
                        if(criteria.CostEstUnitType == "1")
                        {
                            
                            /*if coust estimate type is 1 then filter by Square Wah*/
                            result = result.Where(r => r.ParcelPrice >= priceStart &&
                                                   r.ParcelPrice <= priceEnd
                                                  ).ToList();
                        }
                        else
                        {
                            /*if coust estimate type is 1 then filter by Square Plang*/
                            result = result.Where(r => r.ParcelWAHPrice >= priceStart &&
                                                   r.ParcelWAHPrice <= priceEnd
                                                  ).ToList();
                        }
                        
                    }
                    else if (criteria.PriceType == "2")
                    {
                        result = result.Where(r => r.MarketPrice >= priceStart &&
                                                   r.MarketPrice <= priceEnd
                        ).ToList();
                    }

                }



            }

            return result;
        }


        private List<Models.EstimateData> GetMapInfo(MapSearchCriteria criteria)
        {
            List<Models.EstimateData> result = new List<Models.EstimateData>(0);
            var repos = new TDAssetRespository();
            List<EstimateData> searchResult = null;

            if (criteria.AreaType == "1")
            {
                searchResult = repos.GetPrice(new SearchMap()
                {
                    SectionType = criteria.Type,
                    Code = criteria.ID,
                    ChanodeNo = criteria.ChanodeNo
                });
            }
            else if (criteria.AreaType == "2")
            {
                searchResult = repos.GetCondoPrice(new SearchMap()
                {
                    SectionType = criteria.Type,
                    Code = criteria.ID,
                    ChanodeNo = criteria.ChanodeNo
                });
            }

            if (searchResult != null && searchResult.Count() > 0)
            {

                if (criteria.CostEstUnitType == "2") // ราคาซื้อขาย
                {

                    searchResult = searchResult.Where(o => (Converting.ToDecimal(o.MarketWAHPrice) >= Converting.ToDecimal(criteria.CostEstMin) && Converting.ToDecimal(o.MarketWAHPrice) <= Converting.ToDecimal(criteria.CostEstMax))).ToList();
                }
                else
                {
                    searchResult = searchResult.Where(o => (Converting.ToDecimal(o.ParcelWAHPrice) >= Converting.ToDecimal(criteria.CostEstMin) && Converting.ToDecimal(o.ParcelWAHPrice) <= Converting.ToDecimal(criteria.CostEstMax))).ToList();
                }


                foreach (EstimateData data in searchResult)
                {
                    data.Name = data.DisplayName;

                    data.MapStructure = new Models.ViewModels.MapStructureInfo()
                    {
                        ParcelDrawingCode = (criteria.AreaType == "2") ? "poin" : data.ParcelColor,
                        MarketDrawingCode = (criteria.AreaType == "2") ? "poin" : data.MarketColor,

                        Shape = data.Shape.ToString()


                    };
                    data.PriceType = criteria.PriceType;
                    data.CostEstUnitType = criteria.CostEstUnitType;
                    data.AreaType = criteria.AreaType;

                }
            }

            return searchResult;
        }


        //private List<Models.ViewModels.MAP_ViewModel> GetMapInfo(SetionType type, string code)
        private List<Models.ViewModels.MAP_ViewModel> GetMapInfo1(MapSearchCriteria criteria)
        {
            List<Models.ViewModels.MAP_ViewModel> result = new List<Models.ViewModels.MAP_ViewModel>(0);
            var repos = new TDAssetRespository();
            List<EstimateData> searchResult = null ;

            if (criteria.AreaType == "1")
            {
                searchResult = repos.GetPrice(new SearchMap()
                {
                    SectionType = criteria.Type,
                    Code = criteria.ID,
                    ChanodeNo = criteria.ChanodeNo
                });
            }
            else if (criteria.AreaType == "2")
            {
                searchResult = repos.GetCondoPrice(new SearchMap()
                {
                    SectionType = criteria.Type,
                    Code = criteria.ID,
                    ChanodeNo = criteria.ChanodeNo
                });
            }

                if (searchResult != null && searchResult.Count() > 0)
            {
                result = searchResult.Select(r => new TDM.Models.ViewModels.MAP_ViewModel()
                {

                    Name = r.DisplayName,

                    ParcelPrice = criteria.ChanodeNo==null ? DecimalHelper.ToDecimal(r.ParcelPrice, -1) :  DecimalHelper.ToDecimal(r.ParcelWAHPrice, -1),
                    ParcelPriceMin = DecimalHelper.ToDecimal(r.ParcelWAHPriceMin, -1),
                    ParcelPriceMax = DecimalHelper.ToDecimal(r.ParcelWAHPriceMax, -1),
                    ParcelPriceAvg = DecimalHelper.ToDecimal(r.ParcelWAHPriceAvg, -1),

                    MarketPrice = criteria.ChanodeNo == null ? DecimalHelper.ToDecimal(r.MarketPrice, -1) : DecimalHelper.ToDecimal(r.ParcelWAHPrice, -1),
                    MarketPriceMin = DecimalHelper.ToDecimal(r.MarketWAHPriceMin, -1),
                    MarketPriceMax = DecimalHelper.ToDecimal(r.MarketWAHPriceMax, -1),
                    MarketPriceAvg = DecimalHelper.ToDecimal(r.MarketWAHPriceAvg, -1),
                    LATITUDE = r.LATITUDE,
                    LONGITUDE = r.LONGITUDE,
                    MapStructure = new Models.ViewModels.MapStructureInfo()
                    {
                        ParcelDrawingCode = (criteria.AreaType == "2")? "poin" : r.ParcelColor,
                        MarketDrawingCode = (criteria.AreaType == "2")? "poin" : r.MarketColor,

                        Shape = r.Shape.ToString()

                    },
                    MaxPrice = false,
                    MinPrice = false,

                    PriceType = criteria.PriceType,
                    CostEstUnitType = criteria.CostEstUnitType,
                    AreaType = criteria.AreaType

                }).ToList();

                if (result.Count() > 1)
                {
                    if (criteria.PriceType == "1")
                    {
                        result = result.OrderBy(r => r.ParcelPrice).ToList();
                        var target = result.Where(rs => rs.ParcelPrice > 0);
                        if (target.Any())
                        {
                            var max = target.Max(t => t.ParcelPrice);
                            var min = target.Min(t => t.ParcelPrice);
                            if (max != min)
                            {
                                result.Where(rs => rs.ParcelPrice == min).ToList().ForEach(r => r.MinPrice = true);
                                result.Where(rs => rs.ParcelPrice == max).ToList().ForEach(r => r.MaxPrice = true);
                            }
                        }

                    }
                    else
                    {
                        result = result.OrderBy(r => r.MarketPrice).ToList();
                        var target = result.Where(rs => rs.MarketPrice > 0);

                        if (target.Any())
                        {
                            var max = target.Max(t => t.MarketPrice);
                            var min = target.Min(t => t.MarketPrice);
                            if (max != min)
                            {
                                result.Where(rs => rs.MarketPrice == min).ToList().ForEach(r => r.MinPrice = true);
                                result.Where(rs => rs.MarketPrice == max).ToList().ForEach(r => r.MaxPrice = true);
                            }
                        }
                    }

                    
                }

                result = ExecuteClientCriteria(criteria,result);
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