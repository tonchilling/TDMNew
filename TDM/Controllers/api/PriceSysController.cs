using Microsoft.SqlServer.Types;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TDM.Models;
using TDM.Models.Utils;
using TDM.Repositories;
using TDM.Models.Utils;

namespace TDM.Controllers.api
{
    public class PriceSysController : ApiController
    {
        int overMax = 10;
       
        public IHttpActionResult GetPOIs(string changwatCode, string amphurCode, string tumbonCode)
        {
            var repos = new TDAssetRespository();
            var pois = repos.GetPOIs(changwatCode, amphurCode, tumbonCode);

            return Json(from q in pois
                        select
                        new
                        {
                            OBJECT_ID = q.OBJECTID,
                            NAME = q.NAME_T,
                            X = q.X,
                            Y = q.Y,
                            CHANGWAT_NAME = q.PROV_NAME_T,
                            TUMBON_NAME = q.TUMB_NAME_T,
                            AMPHUR_NAME = q.AMPH_NAME_T,
                            TUMBON_CODE = q.TUMB_CODE,
                        }
            );
        }

        [HttpPost]
        public IHttpActionResult GetPrice(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();
         
           /* switch (SectionType)
            {
                case "1":sectionT = SetionType.Region;break;
                case "2": sectionT = SetionType.Provice; break;
                case "3": sectionT = SetionType.Amphur; break;
            }*/

        

            var estimateData = repos.GetPrice(searchDto);

            return Json(estimateData);
        }


        [HttpGet]
        public IHttpActionResult GetDropDownList(string Code)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();



            var estimateData = repos.GetDropDownList(Code);

            return Json(estimateData);
        }




        [HttpPost]
        public IHttpActionResult GetPriceBI(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();
            GetPriceBI resultList = new GetPriceBI();
            List<string> data = null;
            List<BarchartValue> value = null;
            List<BarchartValue> value2 = null;
            BarchartValue barValue = null;
            var barchart = new Barchart();
            int row = 0;

            var estimateData = repos.GetPriceBI(searchDto);

            resultList.EstimateData = estimateData.OrderByDescending(o => o.ParcelPriceMax).ToList();
            if (estimateData != null)
            {
                data = new List<string>();
                value = new List<BarchartValue>();
                value2 = new List<BarchartValue>();

                row = 0;
                foreach (EstimateData result in estimateData.OrderByDescending(o => o.ParcelWAHPriceMax))
                {
                    if (row >= overMax)
                    {
                        break;
                    }
                    barValue = new BarchartValue();
                    barValue.name = result.DisplayName;
                    barValue.value = Converting.ToDecimal(result.ParcelWAHPriceMax);
                    barValue.key = result.DisplayCode;


                    value.Add(barValue);


                    barValue = new BarchartValue();
                    barValue.name = result.DisplayName;
                    barValue.value = Converting.ToDecimal(result.MarketWAHPriceMax);
                    barValue.key = result.DisplayCode;
                    value2.Add(barValue);



                    data.Add(result.DisplayName);
                    row++;

                }

                barchart.Data = data;
                barchart.Value = value;
                barchart.Value2 = value2;
            }

            resultList.Barchart = barchart;

            return Json(resultList);
        }




        [HttpPost]
        public IHttpActionResult GetPriceOfCondo(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();


            var estimateData = repos.GetPriceOfCondo(searchDto);

            return Json(estimateData);
        }


        [HttpPost]
        public IHttpActionResult GetPriceOfCondoBI(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();
            GetPriceBI resultList = new GetPriceBI();
            List<string> data = null;
            List<BarchartValue> value = null;
            List<BarchartValue> value2 = null;
            BarchartValue barValue = null;
            var barchart = new Barchart();
            int row = 0;

            var estimateData = repos.GetPriceOfCondoBI(searchDto);

            resultList.EstimateData = estimateData.OrderByDescending(o => o.ParcelPriceMax).ToList();
            if (estimateData != null)
            {
                data = new List<string>();
                value = new List<BarchartValue>();
                value2 = new List<BarchartValue>();

                foreach (EstimateData result in estimateData.OrderByDescending(o => o.ParcelPriceMax))
                {

                    if (row >= overMax)
                    {
                        break;
                    }


                    barValue = new BarchartValue();
                    barValue.name = result.DisplayName;
                    barValue.value = Converting.ToDecimal(result.ParcelPriceMax);
                    barValue.key = result.DisplayCode;


                    value.Add(barValue);


                    barValue = new BarchartValue();
                    barValue.name = result.DisplayName;
                    barValue.value = Converting.ToDecimal(result.MarketPriceMax);
                    barValue.key = result.DisplayCode;
                    value2.Add(barValue);



                    data.Add(result.DisplayName);

                    row++;

                }

                barchart.Data = data;
                barchart.Value = value;
                barchart.Value2 = value2;
            }

            resultList.Barchart = barchart;

            return Json(resultList);

           
        }


        [HttpPost]

        public IHttpActionResult GetRegisterLand(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();

            /* switch (SectionType) 
             {
                 case "1":sectionT = SetionType.Region;break;
                 case "2": sectionT = SetionType.Provice; break;
                 case "3": sectionT = SetionType.Amphur; break;
             }*/



            var estimateData = repos.GetRegisterLand(searchDto);

            return Json(estimateData);
        }

        [HttpPost]
        public IHttpActionResult GetCondoCompare(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();

            /* switch (SectionType)
             {
                 case "1":sectionT = SetionType.Region;break;
                 case "2": sectionT = SetionType.Provice; break;
                 case "3": sectionT = SetionType.Amphur; break;
             }*/



            var estimateData = repos.GetCondoCompare(searchDto);

            return Json(estimateData);
        }



        [HttpPost]
        public IHttpActionResult GetPriceOfConstruction(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();

            /* switch (SectionType)
             {
                 case "1":sectionT = SetionType.Region;break;
                 case "2": sectionT = SetionType.Provice; break;
                 case "3": sectionT = SetionType.Amphur; break;
             }*/



            var estimateData = repos.GetPriceOfConstrucion(searchDto);
           
            return Json(estimateData.OrderByDescending(o => o.ParcelPrice).ToList() );
        }


        [HttpPost]
        public IHttpActionResult GetPriceOfConstructionBI(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();
            int row = 0;
            GetPriceBI resultList = new GetPriceBI();
            List<string> data = null;
            List<BarchartValue> value = null;
            List<BarchartValue2> value2 = null;
            BarchartValue barValue = null;
            BarchartValue2 barValue3 = null;
            var barchart = new Barchart();


            var estimateData = repos.GetPriceOfConstrucionBI(searchDto);
            resultList.EstimateData = resultList.EstimateData = estimateData.OrderByDescending(o => o.ParcelPrice).ToList();

            if (estimateData != null)
            {
                data = new List<string>();
                value = new List<BarchartValue>();
                value2 = new List<BarchartValue2>();

                foreach (EstimateData result in estimateData.OrderByDescending(o => o.ParcelPrice))
                {

                    if (row >= overMax)
                    {
                        break;
                    }
                    barValue = new BarchartValue();
                    barValue.name = result.DisplayName;
                    barValue.value = Converting.ToDecimal(result.ParcelPrice);
                    barValue.key = result.DisplayCode;


                    value.Add(barValue);



                    //  { xAxis: 0, y: 350, name: 'Line', symbolSize: 20, symbol: 'image://../asset/ico/折线图.png' }
                    barValue3 = new BarchartValue2();
                    barValue3.xAxis = 0;
                    barValue3.y = 350;
                    barValue3.name = result.DisplayName;
                    barValue3.symbolSize = 20;
                    barValue3.symbol = "";

                    barValue3.key = result.DisplayCode;
                    value2.Add(barValue3);



                    data.Add(result.DisplayName);

                    
                    row++;

                }

                barchart.Data = data;
                barchart.Value = value;
                barchart.Value3 = value2;
            }

            resultList.Barchart = barchart;


            return Json(resultList);
        }



        [HttpPost]

        public IHttpActionResult GetCondoRegisterMenu2(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();

            /* switch (SectionType)
             {
                 case "1":sectionT = SetionType.Region;break;
                 case "2": sectionT = SetionType.Provice; break;
                 case "3": sectionT = SetionType.Amphur; break;
             }*/

            if(searchDto.FromYear!=null && searchDto.FromMonth!=null)
            searchDto.FromYearMonth = searchDto.FromYear + Converting.ToInt(searchDto.FromMonth).ToString("##00");

            if (searchDto.ToYear != null && searchDto.ToMonth != null)
                searchDto.ToYearMonth= searchDto.ToYear + Converting.ToInt(searchDto.ToMonth).ToString("##00");

            var estimateData = repos.GetCondoRegisterMenu2(searchDto);

            return Json(estimateData);
        }

        [HttpPost]
        public IHttpActionResult GetLandPriceCompareMenu3(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();

            /* switch (SectionType)
             {
                 case "1":sectionT = SetionType.Region;break;
                 case "2": sectionT = SetionType.Provice; break;
                 case "3": sectionT = SetionType.Amphur; break;
             }*/

        
            var estimateData = repos.GetLandPriceCompareMenu3(searchDto);

            return Json(estimateData);
        }


        [HttpPost]
        public IHttpActionResult GetLandRatio(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            SetionType sectionT = new SetionType();

            /* switch (SectionType)
             {
                 case "1":sectionT = SetionType.Region;break;
                 case "2": sectionT = SetionType.Provice; break;
                 case "3": sectionT = SetionType.Amphur; break;
             }*/


            var estimateData = repos.GetLandRatio(searchDto);

            return Json(estimateData);

        }


        public IHttpActionResult GetResultDetail(string searchCriteria, string radius, string parcel_type, string shapes, string object_id,
            string changwatCode, string amphurCode, string tumbonCode, string x, string y, string branchCode)
        {
            var repos = new TDAssetRespository();
            var result = new List<dynamic>();
            var _shapes = JsonConvert.DeserializeObject<List<dynamic>>(Convert.ToString(shapes));
            var branchCodes = JsonConvert.DeserializeObject<string[]>(Convert.ToString(branchCode));

            switch (parcel_type)
            {
                case "1": //CHANOD
                    result = repos.GetChanods(_shapes, changwatCode, radius, branchCodes);
                    break;
                case "2": //NS3K
                    result = repos.GetNS3Ks(_shapes, changwatCode, radius, branchCodes);
                    break;
                default:
                    return NotFound();
            }

            var poi = searchCriteria == "condition" ? repos.GetPOI(object_id) : new POI
            {
                NAME_T = "ข้อมูลแปลงที่ดินโดยรวม",
            };

            return Json(new
            {
                OBJECT_ID = Convert.ToInt32(object_id),
                NAME = Convert.ToString(poi.NAME_T),
                TOTAL_PARCEL_COUNT = string.Format("{0:N0}", result.Count()),
                TOTAL_AREA_RAI = string.Format("{0:N2}", result.Select<dynamic, int>(hd => Convert.ToInt16(hd.NRAI)).Sum() * 400),
                TOTAL_VAL_AMT = string.Format("{0:N2}", result.Select<dynamic, decimal>(o => Convert.ToDecimal(o.VAL_AMT)).Sum()),
            });
        }

        public IHttpActionResult GetResultsPOIs(string radius, string parcel_type, string shapes, string object_id,
            string changwatCode, string amphurCode, string tumbonCode, string x, string y, string branchCode)
        {
            var repos = new TDAssetRespository();
            var result = new List<dynamic>();
            var _shapes = JsonConvert.DeserializeObject<List<dynamic>>(shapes);
            var branchCodes = JsonConvert.DeserializeObject<string[]>(Convert.ToString(branchCode));

            if (parcel_type == "1") //CHANOD
            {
                result = repos.GetChanods(_shapes, changwatCode, radius, branchCodes);
            }
            else if (parcel_type == "2") //NS3K
            {
                result = repos.GetNS3Ks(_shapes, changwatCode, radius, branchCodes);
            }
            else
            {
                return NotFound();
            }

            return Json(from o in result
                        select new
                        {
                            OBJECT_ID = o.OBJECTID,
                            PARCEL_TYPE = parcel_type == "1" ? "โฉนด" : "น.ส.3ก.",
                            CHANOD_NO = Convert.ToString(o.CHANOD_NO),
                            LAND_NO = Convert.ToString(o.LAND_NO),
                            PASS_THROUGH = "100%",
                            VAL_AMT = string.Format("{0:N2}", Convert.ToDecimal(o.VAL_AMT)),
                        });
        }

        public IHttpActionResult GetPOIDetail(string object_id, string radius, string parcel_type, string changwatCode, string chanod_no)
        {
            var tdRepo = new TDAssetRespository();

            dynamic o;

            if (parcel_type == "1") //CHANOD
            {
                o = tdRepo.GetChanodDetail(object_id, changwatCode, chanod_no);
            }
            else if (parcel_type == "2") //NS3K
            {
                o = tdRepo.GetNS3KDetail(object_id, changwatCode, chanod_no);
            }
            else
            {
                return NotFound();
            }

            var data = new
            {
                PARCEL_TYPE = GetParcelTypeName(Convert.ToString(o.PARCEL_TYPE)),
                UTMMAP1 = Convert.ToString(o.UTMMAP1),
                UTMMAP3 = Convert.ToString(o.UTMMAP3),
                SURVEY_NO = Convert.ToInt16(o.SURVEY_NO),
                CHANOD_NO = Convert.ToInt16(o.CHANOD_NO),
                LAND_NO = Convert.ToInt16(o.LAND_NO),
                BRANCH_CODE = Convert.ToString(o.BRANCH_CODE),
                CHANGWAT_CODE = o.CHANGWAT_CODE,
                CHANGWAT_NAME = o.CHANGWAT_NAME,
                AMPHUR_CODE = o.AMPHUR_CODE,
                AMPHUR_NAME = o.AMPHUR_NAME,
                TUMBON_CODE = o.TUMBON_CODE,
                TUMBON_NAME = o.TUMBON_NAME,
                NRAI = Convert.ToInt16(o.NRAI),
                NNHAN = Convert.ToInt16(o.NNHAN),
                NWAH = Convert.ToInt16(o.NWAH),
                DREMAIN = Convert.ToDecimal(o.DREMAIN),
                PASS_THROUGH = "100%",
                OWNERS = 0,
                VAL_AMT = string.Format("{0:N2}", Convert.ToDecimal(o.VAL_AMT)),
            };

            return Json(data);
        }


        public IHttpActionResult GetPOIDetailCondominiums(string object_id, string radius, string parcel_type, string changwatCode, string chanod_no)
        {
            var tdRepo = new TDAssetRespository();
            var result = new[] { 1, 2 };
            var data = from o in result
                       select new
                       {
                           B = 1,
                       };
            return Json(data);
        }

        private string GetParcelTypeName(string parcelType)
        {

            switch (parcelType)
            {
                case "1": return "แปลงที่ดินมีโฉนด";
                case "2": return "ทางสาธารณประโยชน์(ทางบก)";
                case "3": return " ทางสาธารณประโยชน์(ทางน้ำ)";
                case "4": return " แปลงที่ดินมี นสล. ";
                case "5": return " แปลงที่ดินมี น.ส.3 ก.";
                case "6": return " แปลงที่ดินมี น.ส. 3";
                case "7": return " แปลงที่ดินมี โฉนดตราจอง";
                case "8": return " แปลงที่ดินมี ตราจองฯ";
                case "9": return " สาธารณประโยชน์";
                case "10": return " ท.ค.";
                default: return "";
            }
        }

        public IHttpActionResult GetPOI(string prov_id, string amph_id, string tumb_id)
        {
            TDASSETEntities db = new TDASSETEntities();
            db.Configuration.ProxyCreationEnabled = false;

            return Json(db.POIs.Where(p => p.PROV_CODE == prov_id && p.AMPH_CODE == amph_id && (string.IsNullOrEmpty(tumb_id) || p.TUMB_CODE == tumb_id)).OrderBy(o => o.NAME_T).Select(p => new {
                NAME_T = p.NAME_T,
                X = p.X,
                Y = p.Y,
                p.PROV_NAME_T,
                p.TUMB_NAME_T,
                p.AMPH_NAME_T,
                p.TUMB_CODE
            }));
        }

        //* string point, string prov_id, string amph_id, string tumb_id
        public IHttpActionResult GetParcelSummary(string point, string prov_id, string amph_id, string tumb_id)
        {
            TDASSETEntities db = new TDASSETEntities();

            //point = "POINT(671764.338096 1516509.4789)";
            //point = "POINT(11195621.807372887 1543041.14262334)";
            if (!string.IsNullOrEmpty(amph_id))
            {
                amph_id = amph_id.Substring(amph_id.Length - 2);
            }
            if (!string.IsNullOrEmpty(tumb_id))
            {
                tumb_id = tumb_id.Substring(tumb_id.Length - 2);
            }

            string bufferQuery = $@"DECLARE @g geometry;  
                                    SET @g = geometry::STGeomFromText('{point}', 32647).STBuffer(100); 
                                    SELECT @g;";
            DbGeometry buffer = db.Database.SqlQuery<DbGeometry>(bufferQuery).First();

            List<PARCEL_Model> resultParcel = new List<PARCEL_Model>();
            bufferQuery = $@"SELECT TOP (50) 
                            [OBJECTID],[OGR_FID],[PARCEL_TYPE],[UTMMAP1],[UTMMAP2],[UTMMAP3],[UTMMAP4],[UTMSCALE],[LAND_NO],[LAND_TH],[LAND_NAME],[ACTION_STATUS],[LAND_AREA],[BRANCH_CODE],[BRANCH_NAME],[CHANGWAT_CODE],[CHANGWAT_NAME],[AMPHUR_CODE],[AMPHUR_NAME],[TUMBON_CODE],[TUMBON_NAME],[CHANOD_NO],[SURVEY_NO],[TABLE_3_SEQ],[ACCOUNTING_PERIOD],[PARCEL_SHAPE],[PARCEL_RN],[STREET_RN],[BLOCK_ZONE_RN],[BLOCK_PRICE_RN],[BLOCK_FIX_RN],[BLOCK_BLUE_RN],[PREV_EVAPRICE],[CURR_EVAPRICE],[DATE_CREATED],[USER_CREATED],[DATE_UPDATED],[USER_UPDATED],[SHAPE],[GDB_GEOMATTR_DATA],[EDIT_FLAG]
                            FROM [TDASSET].[tdadmin].[PARCEL_47_{prov_id}]
                            WHERE [AMPHUR_CODE]={amph_id} AND [TUMBON_CODE]={tumb_id}";
            bufferQuery = $@"IF (EXISTS (SELECT * 
                             FROM INFORMATION_SCHEMA.TABLES 
                             WHERE TABLE_SCHEMA = 'tdadmin' 
                             AND  TABLE_NAME = 'PARCEL_47_{prov_id}'))
                             BEGIN
                              {bufferQuery}
                             END";
            resultParcel.AddRange(db.Database.SqlQuery<PARCEL_Model>(bufferQuery).ToList());

            bufferQuery = $@"SELECT TOP (50) 
                            [OBJECTID],[OGR_FID],[PARCEL_TYPE],[UTMMAP1],[UTMMAP2],[UTMMAP3],[UTMMAP4],[UTMSCALE],[LAND_NO],[LAND_TH],[LAND_NAME],[ACTION_STATUS],[LAND_AREA],[BRANCH_CODE],[BRANCH_NAME],[CHANGWAT_CODE],[CHANGWAT_NAME],[AMPHUR_CODE],[AMPHUR_NAME],[TUMBON_CODE],[TUMBON_NAME],[CHANOD_NO],[SURVEY_NO],[TABLE_3_SEQ],[ACCOUNTING_PERIOD],[PARCEL_SHAPE],[PARCEL_RN],[STREET_RN],[BLOCK_ZONE_RN],[BLOCK_PRICE_RN],[BLOCK_FIX_RN],[BLOCK_BLUE_RN],[PREV_EVAPRICE],[CURR_EVAPRICE],[DATE_CREATED],[USER_CREATED],[DATE_UPDATED],[USER_UPDATED],[SHAPE],[GDB_GEOMATTR_DATA],[EDIT_FLAG]
                            FROM [TDASSET].[tdadmin].[PARCEL_48_{prov_id}]
                            WHERE [AMPHUR_CODE]={amph_id} AND [TUMBON_CODE]={tumb_id}";
            bufferQuery = $@"IF (EXISTS (SELECT * 
                             FROM INFORMATION_SCHEMA.TABLES 
                             WHERE TABLE_SCHEMA = 'tdadmin' 
                             AND  TABLE_NAME = 'PARCEL_48_{prov_id}'))
                             BEGIN
                              {bufferQuery}
                             END";
            resultParcel.AddRange(db.Database.SqlQuery<PARCEL_Model>(bufferQuery).ToList());



            List<PARCEL_Model> result = resultParcel.Where(x => x.SHAPE.Intersects(buffer)).ToList();

            return Json(result);
        }
        //*/
    }

}
