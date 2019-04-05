using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using TDM.Models;
using TDM.Models.Utils;
using Dapper;
using System.Configuration;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace TDM.Repositories
{
    public class TDAssetRespository : BaseRepository
    {
        const int SRID_24047 = 24047;
        const int SRID_24048 = 24048;

        enum THAILAND_ZONE
        {
            TH_ZONE_47 = 47,
            TH_ZONE_48 = 48,
        }

        public override IDbConnection CreateConnection()
        {
            var regex = new Regex("(data source)=\\w.*");
            var connectionString = regex.Match(ConfigurationManager.ConnectionStrings["TDASSETEntities"].ConnectionString).Value.TrimEnd(new char[] { '"' });
            return new SqlConnection(connectionString);
        }


        public IDbConnection CreateConnectionManage()
        {
            var regex = new Regex("(data source)=\\w.*");
            var connectionString = regex.Match(ConfigurationManager.ConnectionStrings["TDManagementEntities"].ConnectionString).Value.TrimEnd(new char[] { '"' });
            return new SqlConnection(connectionString);
        }

        public List<POI> GetPOIs(string prov_code, string amph_cod, string tumb_code)
        {
            using (IDbConnection conn = CreateConnection())
            {
                var sql = @"SELECT OBJECTID,NAME_T,X,Y,PROV_NAME_T,AMPH_NAME_T,TUMB_NAME_T,TUMB_CODE FROM [POI] WHERE PROV_CODE = @PROV_CODE AND (@AMPH_CODE IS NULL OR AMPH_CODE = @AMPH_CODE) AND (@TUMB_CODE IS NULL OR TUMB_CODE = @TUMB_CODE) ORDER BY NAME_T";
                return conn.Query<POI>(sql, new
                {
                    PROV_CODE = prov_code,
                    AMPH_CODE = amph_cod,
                    TUMB_CODE = tumb_code,
                }).ToList();
            }
        }




        /// <summary>
        /// get Province by Region or Cluster
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public List<PROVINCE> GetProvince(SearchMap search)
        {
            IDataReader reader = null;
            List<PROVINCE> result = null;
            PROVINCE data = null;
            var p = new DynamicParameters();
            p.Add("@LocationType", (int)search.LocationType); // Region=1, Cluster=2
            p.Add("@Code", search.Code, dbType: DbType.String);    // Region=Code, Cluster=47 or 48

            try
            {
                result = new List<PROVINCE>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetProvince", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.PROVINCE();
                        data.PRO_C = reader["PRO_C"].ToString();
                        data.ON_PRO_THA = reader["ON_PRO_THA"].ToString();
                        data.ON_PRO_ENG = reader["ON_PRO_ENG"].ToString();
                        //  data.OBJECTID = Convert.ToInt32(reader["OBJECTID"].ToString());
                        data.NAME_T = reader["NAME_T"].ToString();
                        data.NAME_E = reader["NAME_E"].ToString();

                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }


        /// <summary>
        /// get Province by Region or Cluster
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public List<AMPHOE> GetAMPHOE(SearchMap search)
        {
            IDataReader reader = null;
            List<AMPHOE> result = null;
            AMPHOE data = null;
            var p = new DynamicParameters();
            p.Add("@LocationType", (int)search.LocationType); // Region=1, Cluster1=47,Cluster1=48
            p.Add("@Code", search.Code, dbType: DbType.String);    // ProvinceCode

            try
            {
                result = new List<AMPHOE>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("[GetAMPHOE]", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.AMPHOE();
                        data.PRO_C = reader["PRO_C"].ToString();
                        data.ON_PRO_THA = reader["ON_PRO_THA"].ToString();
                        data.ON_DIS_THA = reader["ON_DIS_THA"].ToString();
                        data.ON_DIS_ENG = reader["ON_DIS_ENG"].ToString();
                        data.DIS_C = reader["DIS_C"].ToString();
                        // data.NAME_T = reader["NAME_T"].ToString();
                        //  data.OBJECTID = Convert.ToInt32(reader["OBJECTID"].ToString());
                        data.NAME_T = reader["NAME_T"].ToString();
                        //  data.NAME_E = reader["NAME_E"].ToString();

                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }

        public List<TAMBOL> GetTAMBOL(SearchMap search)
        {
            IDataReader reader = null;
            List<TAMBOL> result = null;
            TAMBOL data = null;
            var p = new DynamicParameters();
            p.Add("@LocationType", (int)search.LocationType); // Region=1, Cluster1=47,Cluster1=48
            p.Add("@Code", search.Code, dbType: DbType.String);    // AMPHOECode

            try
            {
                result = new List<TAMBOL>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetTAMBOL", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {

                        //  pro_c,on_pro_tha,NAME_T,dis_c,SUB_C,ON_DIS_THA,ON_DIS_ENG,ON_SUB_THA,ON_SUB_ENG
                        data = new Models.TAMBOL();
                        data.PRO_C = reader["PRO_C"].ToString();
                        data.ON_PRO_THA = reader["ON_PRO_THA"].ToString();
                        data.NAME_T = reader["ON_DIS_THA"].ToString();
                        data.DIS_C = reader["DIS_C"].ToString();
                        data.SUB_C = reader["SUB_C"].ToString();
                        data.ON_DIS_THA = reader["ON_DIS_THA"].ToString();
                        data.ON_DIS_ENG = reader["ON_DIS_ENG"].ToString();
                        data.ON_PRO_THA = reader["ON_PRO_THA"].ToString();
                        data.ON_SUB_ENG = reader["ON_SUB_ENG"].ToString();
                        data.ON_SUB_THA = reader["ON_SUB_THA"].ToString();
                        data.NAME_T = reader["NAME_T"].ToString();


                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }


        /// <summary>
        /// Home>Menu1
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public RegisterLand GetRegisterLand(SearchMap search)
        {

            IDataReader reader = null;
            RegisterLand result = null;
            RegisterLandSummary regSummaryData = null;
            RegisterLandByMonth regSummarybByMonthData = null;
            List<RegisterLandByMonth> regSummaryByMonthList = null;
            var p = new DynamicParameters();
            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@Code", search.Code, dbType: DbType.String);
            p.Add("@Month", search.Month, dbType: DbType.String);
            p.Add("@Year", search.Year, dbType: DbType.String);



            try
            {

                result = new RegisterLand();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    //conn.
                    reader = conn.ExecuteReader("[GetLandRegisterMenu1]", p, commandType: CommandType.StoredProcedure);

                    if (reader.Read())
                    {
                        regSummaryData = new RegisterLandSummary();
                        regSummaryData.ParcelRegister = Converting.ToDecimal(reader["ParcelRegister"].ToString());
                        regSummaryData.ParcelNewRegister = Converting.ToDecimal(reader["ParcelNewRegister"].ToString());
                        regSummaryData.ParcelMonthRegister = Converting.ToDecimal(reader["ParcelMonthRegister"].ToString());
                        regSummaryData.ParcelMonthNewRegister = Converting.ToDecimal(reader["ParcelMonthNewRegister"].ToString());


                    }

                    result.summaryData = regSummaryData;

                    reader.NextResult();
                    regSummaryByMonthList = new List<RegisterLandByMonth>();
                    while (reader.Read())
                    {
                        regSummarybByMonthData = new RegisterLandByMonth();
                        regSummarybByMonthData.RegMonth = Converting.ToDecimal(reader["RegMonth"].ToString());
                        regSummarybByMonthData.MonthName = Converting.ToMonthShortName(reader["RegMonth"].ToString());
                        regSummarybByMonthData.RegYear = reader["RegYear"].ToString();
                        regSummarybByMonthData.ParcelRegister = Converting.ToDecimal(reader["ParcelRegister"].ToString());
                        regSummarybByMonthData.ParcelNewRegister = Converting.ToDecimal(reader["ParcelNewRegister"].ToString());
                        regSummaryByMonthList.Add(regSummarybByMonthData);

                    }

                    result.summaryByMonthData = regSummaryByMonthList;

                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }



        public List<DropdownObj> GetCluster()
        {
            IDataReader reader = null;
            List<DropdownObj> result = null;
            DropdownObj data = null;
            var p = new DynamicParameters();
            // p.Add("@SectionType", (int)search.SectionType);
            // p.Add("@Code", search.Code, dbType: DbType.String);

            try
            {
                result = new List<DropdownObj>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetCluster", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.DropdownObj();
                        data.Name = reader["Name"].ToString();
                        data.Value = reader["Value"].ToString();
                        result.Add(data);
                    }
                }
            }
            catch (Exception ex)
            { }

            return result;
        }




        public List<DropdownObj> GetConstructionType()
        {
            IDataReader reader = null;
            List<DropdownObj> result = null;
            DropdownObj data = null;
            var p = new DynamicParameters();
            // p.Add("@SectionType", (int)search.SectionType);
            // p.Add("@Code", search.Code, dbType: DbType.String);

            try
            {
                result = new List<DropdownObj>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetConstructionType", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.DropdownObj();
                        data.Name = reader["Name"].ToString();
                        data.Value = reader["Value"].ToString();
                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }



        public List<EstimateData> GetCondoPrice(SearchMap search)
        {
            IDataReader reader = null;
            List<EstimateData> result = null;
            EstimateData data = null;
            var p = new DynamicParameters();
            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@Code", search.Code, dbType: DbType.String);

            try
            {
                result = new List<EstimateData>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetPrice_Condo", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.EstimateData();
                        data.DisplayCode = reader["DisplayCode"].ToString();
                        data.DisplayName = reader["DisplayName"].ToString();
                        data.RegionCode = reader["RegionCode"].ToString();
                        data.RegionName = reader["RegionName"].ToString();
                        data.ProviceCode = reader["ProviceCode"].ToString();
                        data.ProviceName = reader["ProviceName"].ToString();
                        data.AmphureCode = reader["AmphureCode"].ToString();
                        data.AmphureName = reader["AmphureName"].ToString();
                        data.TAMBOLCode = reader["TAMBOLCode"].ToString();
                        data.TAMBOLName = reader["TAMBOLName"].ToString();
                        data.MarketPrice = reader["MarketPrice"].ToString();
                        data.MarketPriceMin = reader["MarketPriceMin"].ToString();
                        data.MarketPriceMax = reader["MarketPriceMax"].ToString();
                        data.MarketPriceAvg = reader["MarketPriceAvg"].ToString();
                        data.ParcelPrice = reader["ParcelPrice"].ToString();
                        data.ParcelPriceMin = reader["ParcelPriceMin"].ToString();
                        data.ParcelPriceMax = reader["ParcelPriceMax"].ToString();
                        data.ParcelPriceAvg = reader["ParcelPriceAvg"].ToString();
                        data.LAND_AREA = reader["LAND_AREA"].ToString();
                        data.LAND_Total = reader["LAND_Total"].ToString();
                        data.MarketColor = reader["MarketColor"].ToString();
                        data.ParcelColor = reader["ParcelColor"].ToString();
                        data.Shape = reader["Shape"].ToString();

                        data.LATITUDE = reader["LATITUDE"].ToString();
                        data.LONGITUDE = reader["LONGITUDE"].ToString();


                        result.Add(data);


                    }
                }
            }
            catch (Exception ex)

            { }

            return result;
        }




        /// <summary>
        /// Section 2,3
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public List<EstimateData> GetPrice(SearchMap search)
        {
            IDataReader reader = null;
            List<EstimateData> result = null;
            EstimateData data = null;
            var p = new DynamicParameters();
            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@Code", search.Code, dbType: DbType.String);
            p.Add("@ChanodeNo", search.ChanodeNo == null ? "" : search.ChanodeNo, dbType: DbType.String);
            try
            {
                result = new List<EstimateData>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetPrice", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.EstimateData();
                        data.DisplayCode = reader["DisplayCode"].ToString();
                        data.DisplayName = reader["DisplayName"].ToString();
                        data.RegionCode = reader["RegionCode"].ToString();
                        data.RegionName = reader["RegionName"].ToString();
                        data.ProviceCode = reader["ProviceCode"].ToString();
                        data.ProviceName = reader["ProviceName"].ToString();
                        data.AmphureCode = reader["AmphureCode"].ToString();
                        data.AmphureName = reader["AmphureName"].ToString();
                        data.TAMBOLCode = reader["TAMBOLCode"].ToString();
                        data.TAMBOLName = reader["TAMBOLName"].ToString();

                        data.MarketPrice = Converting.ToDecimal(reader["MarketPrice"].ToString()).ToString("##,##0.00");
                        data.MarketPriceMin = Converting.ToDecimal(reader["MarketPriceMin"].ToString()).ToString("##,##0.00");
                        data.MarketPriceMax = Converting.ToDecimal(reader["MarketPriceMax"].ToString()).ToString("##,##0.00");
                        data.MarketPriceAvg = Converting.ToDecimal(reader["MarketPriceAvg"].ToString()).ToString("##,##0.00");
                        data.MaxMarketAddrCode = reader["MaxMarketAddrCode"].ToString();
                        data.MaxMarketCHANODE_NO = reader["MaxMarketCHANODE_NO"].ToString();
                        data.MinMarketAddrCode = reader["MinMarketAddrCode"].ToString();
                        data.MinMarketCHANODE_NO = reader["MinMarketCHANODE_NO"].ToString();

                        data.MarketWAHPrice = Converting.ToDecimal(reader["MarketWAHPrice"].ToString()).ToString("##,##0.00");
                        data.MarketWAHPriceMin = Converting.ToDecimal(reader["MarketWAHPriceMin"].ToString()).ToString("##,##0.00");
                        data.MarketWAHPriceMax = Converting.ToDecimal(reader["MarketWAHPriceMax"].ToString()).ToString("##,##0.00");
                        data.MarketWAHPriceAvg = Converting.ToDecimal(reader["MarketWAHPriceAvg"].ToString()).ToString("##,##0.00");
                        data.MaxMarketWAHAddrCode = reader["MaxMarketWAHAddrCode"].ToString();
                        data.MaxMarketWAHCHANODE_NO = reader["MaxMarketWAHCHANODE_NO"].ToString();
                        data.MinMarketWAHAddrCode = reader["MinMarketWAHAddrCode"].ToString();
                        data.MinMarketWAHCHANODE_NO = reader["MinMarketWAHCHANODE_NO"].ToString();


                        data.ParcelPrice = Converting.ToDecimal(reader["ParcelPrice"].ToString()).ToString("##,##0.00");
                        data.ParcelPriceMin = Converting.ToDecimal(reader["ParcelPriceMin"].ToString()).ToString("##,##0.00");
                        data.ParcelPriceMax = Converting.ToDecimal(reader["ParcelPriceMax"].ToString()).ToString("##,##0.00");
                        data.ParcelPriceAvg = Converting.ToDecimal(reader["ParcelPriceAvg"].ToString()).ToString("##,##0.00");
                        data.MaxParcelAddrCode = reader["MaxParcelAddrCode"].ToString();
                        data.MaxParcelCHANODE_NO = reader["MaxParcelCHANODE_NO"].ToString();
                        data.MinParcelAddrCode = reader["MinParcelAddrCode"].ToString();
                        data.MinParcelCHANODE_NO = reader["MinParcelCHANODE_NO"].ToString();


                        data.ParcelWAHPrice = Converting.ToDecimal(reader["ParcelWAHPrice"].ToString()).ToString("##,##0.00");
                        data.ParcelWAHPriceMin = Converting.ToDecimal(reader["ParcelWAHPriceMin"].ToString()).ToString("##,##0.00");
                        data.ParcelWAHPriceMax = Converting.ToDecimal(reader["ParcelWAHPriceMax"].ToString()).ToString("##,##0.00");
                        data.ParcelWAHPriceAvg = Converting.ToDecimal(reader["ParcelWAHPriceAvg"].ToString()).ToString("##,##0.00");
                        data.MaxParcelWAHAddrCode = reader["MaxParcelWAHAddrCode"].ToString();
                        data.MaxParcelWAHCHANODE_NO = reader["MaxParcelWAHCHANODE_NO"].ToString();
                        data.MinParcelWAHAddrCode = reader["MinParcelWAHAddrCode"].ToString();
                        data.MinParcelWAHCHANODE_NO = reader["MinParcelWAHCHANODE_NO"].ToString();


                        data.LAND_AREA = reader["LAND_AREA"].ToString();
                        data.LAND_Total = reader["LAND_Total"].ToString();
                        data.MarketColor = reader["MarketColor"].ToString();
                        data.ParcelColor = reader["ParcelColor"].ToString();
                        data.Shape = reader["Shape"].ToString();
                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }


        /// <summary>
        /// Section 2,3
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public List<EstimateData> GetPriceOfCondo(SearchMap search)
        {
            IDataReader reader = null;
            List<EstimateData> result = null;
            EstimateData data = null;
            var p = new DynamicParameters();
            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@Code", search.Code, dbType: DbType.String);

            try
            {
                result = new List<EstimateData>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("[GetPrice_Condo]", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.EstimateData();
                        data.DisplayCode = reader["DisplayCode"].ToString();
                        data.DisplayName = reader["DisplayName"].ToString();
                        data.RegionCode = reader["RegionCode"].ToString();
                        data.RegionName = reader["RegionName"].ToString();
                        data.ProviceCode = reader["ProviceCode"].ToString();
                        data.ProviceName = reader["ProviceName"].ToString();
                        data.AmphureCode = reader["AmphureCode"].ToString();
                        data.AmphureName = reader["AmphureName"].ToString();
                        data.TAMBOLCode = reader["TAMBOLCode"].ToString();
                        data.TAMBOLName = reader["TAMBOLName"].ToString();
                        data.MarketPrice = reader["MarketPrice"].ToString();
                        data.MarketPriceMin = reader["MarketPriceMin"].ToString();
                        data.MarketPriceMax = reader["MarketPriceMax"].ToString();
                        data.MarketPriceAvg = reader["MarketPriceAvg"].ToString();
                        data.ParcelPrice = reader["ParcelPrice"].ToString();
                        data.ParcelPriceMin = reader["ParcelPriceMin"].ToString();
                        data.ParcelPriceMax = reader["ParcelPriceMax"].ToString();
                        data.ParcelPriceAvg = reader["ParcelPriceAvg"].ToString();
                        data.LAND_AREA = reader["LAND_AREA"].ToString();
                        data.LAND_Total = reader["LAND_Total"].ToString();
                        data.MarketColor = reader["MarketColor"].ToString();
                        data.ParcelColor = reader["ParcelColor"].ToString();
                        data.Shape = reader["Shape"].ToString();
                        data.RegisterNo = reader["RegisterNo"].ToString();
                        data.LATITUDE = reader["LATITUDE"].ToString();
                        data.LONGITUDE = reader["LONGITUDE"].ToString();
                        data.CondoName = reader["CondoName"].ToString();

                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }

        public List<EstimateData> GetPriceOfConstrucion(SearchMap search)
        {

            IDataReader reader = null;
            List<EstimateData> result = null;
            EstimateData data = null;
            var p = new DynamicParameters();
            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@Code", search.Code, dbType: DbType.String);
            p.Add("@ConStructionType", search.ConStructionType, dbType: DbType.String);
            p.Add("@ProvinceCodeCompare1", search.ProvinceCodeCompare1, dbType: DbType.String);
            p.Add("@ProvinceCodeCompare2", search.ProvinceCodeCompare2, dbType: DbType.String);
            p.Add("@PercentCompare", search.PercentCompare, dbType: DbType.String);
            try
            {
                result = new List<EstimateData>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetConsturctionPrice", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.EstimateData();
                        data.DisplayCode = reader["DisplayCode"].ToString();
                        data.DisplayName = reader["DisplayName"].ToString();
                        data.RegionCode = reader["RegionCode"].ToString();
                        data.RegionName = reader["RegionName"].ToString();
                        data.ProviceCode = reader["ProviceCode"].ToString();
                        data.ProviceName = reader["ProviceName"].ToString();
                        data.ConstructionType = reader["ConstructionType"].ToString();
                        data.ConstructionName = reader["ConstructionName"].ToString();
                        data.ParcelPrice = reader["ParcelPrice"].ToString();
                        data.ParcelPricePR5 = reader["ParcelPricePR5"].ToString();
                        data.REMARK = reader["REMARK"].ToString();
                        data.CreateDate = reader["CreateDate"].ToString();
                        data.PriceCompare = reader["PriceCompare"].ToString();
                        data.Color = reader["Color"].ToString();
                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }

        public List<EstimateData> GetPriceOfConstrucionBI(SearchMap search)
        {

            IDataReader reader = null;
            List<EstimateData> result = null;
            EstimateData data = null;
            var p = new DynamicParameters();
            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@Code", search.Code, dbType: DbType.String);
            p.Add("@ConStructionType", search.ConStructionType, dbType: DbType.String);
            p.Add("@ProvinceCodeCompare1", search.ProvinceCodeCompare1, dbType: DbType.String);
            p.Add("@ProvinceCodeCompare2", search.ProvinceCodeCompare2, dbType: DbType.String);
            p.Add("@PercentCompare", search.PercentCompare, dbType: DbType.String);
            try
            {
                result = new List<EstimateData>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetConsturctionPriceBI", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.EstimateData();
                        data.DisplayCode = reader["DisplayCode"].ToString();
                        data.DisplayName = reader["DisplayName"].ToString();
                        data.RegionCode = reader["RegionCode"].ToString();
                        data.RegionName = reader["RegionName"].ToString();
                        data.ProviceCode = reader["ProviceCode"].ToString();
                        data.ProviceName = reader["ProviceName"].ToString();
                        data.ConstructionType = reader["ConstructionType"].ToString();
                        data.ConstructionName = reader["ConstructionName"].ToString();
                        data.ParcelPrice = reader["ParcelPrice"].ToString();
                       // data.ParcelPricePR5 = reader["ParcelPricePR5"].ToString();
                      //  data.REMARK = reader["REMARK"].ToString();
                      //  data.CreateDate = reader["CreateDate"].ToString();
                       // data.PriceCompare = reader["PriceCompare"].ToString();
                      //  data.Color = reader["Color"].ToString();
                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }
        public LandSalePriceChanging GetLandPriceCompareMenu3(SearchMap search)
        {

            IDataReader reader = null;
            LandSalePriceChanging result = null;


            List<MapMenu3> MapInfoList = null;
            MapMenu3 mapInfo = null;
            List<DataMenu3> DataList = null;
            DataMenu3 dataInfo = null;
            var p = new DynamicParameters();



            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@LocationType", search.LocationType, dbType: DbType.String);
            p.Add("@Code", search.Code, dbType: DbType.String);
            p.Add("@Year", search.Year, dbType: DbType.String);
            p.Add("@ProvinceCodeCompare1", search.ProvinceCodeCompare1, dbType: DbType.String);

            try
            {
                result = new LandSalePriceChanging();
                DataList = new List<DataMenu3>();
                MapInfoList = new List<MapMenu3>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("GetLandPriceCompareMenu3", p, commandType: CommandType.StoredProcedure);
                    while (reader.Read())
                    {

                        dataInfo = new DataMenu3();
                        dataInfo.ProvinceCode = reader["ProvinceCode"].ToString();
                        dataInfo.ProvinceName = reader["ProvinceName"].ToString();
                        dataInfo.Year = reader["Year"].ToString();
                        dataInfo.Quater = reader["Quater"].ToString();
                        dataInfo.MaxPrice = Converting.ToDecimal(reader["MaxPrice"].ToString());
                        dataInfo.MinPrice = Converting.ToDecimal(reader["MinPrice"].ToString());
                        dataInfo.AvgPrice = Converting.ToDecimal(reader["AvgPrice"].ToString()); ;

                        DataList.Add(dataInfo);
                    }

                    result.DataList = DataList;

                    reader.NextResult();
                    while (reader.Read())
                    {
                        mapInfo = new MapMenu3();
                        mapInfo.ProvinceCode = reader["ProvinceCode"].ToString();
                        mapInfo.ProvinceName = reader["ProvinceName"].ToString();
                        mapInfo.Q1MaxPrice = Converting.ToDecimal(reader["Q1MaxPrice"].ToString());
                        mapInfo.Q1MinPrice = Converting.ToDecimal(reader["Q1MinPrice"].ToString());
                        mapInfo.Q1AvgPrice = Converting.ToDecimal(reader["Q1AvgPrice"].ToString()); ;

                        mapInfo.Q2MaxPrice = Converting.ToDecimal(reader["Q2MaxPrice"].ToString());
                        mapInfo.Q2MinPrice = Converting.ToDecimal(reader["Q2MinPrice"].ToString());
                        mapInfo.Q2AvgPrice = Converting.ToDecimal(reader["Q2AvgPrice"].ToString());

                        mapInfo.Q3MaxPrice = Converting.ToDecimal(reader["Q3MaxPrice"].ToString());
                        mapInfo.Q3MinPrice = Converting.ToDecimal(reader["Q3MinPrice"].ToString());
                        mapInfo.Q3AvgPrice = Converting.ToDecimal(reader["Q3AvgPrice"].ToString());

                        mapInfo.Q4MaxPrice = Converting.ToDecimal(reader["Q4MaxPrice"].ToString());
                        mapInfo.Q4MinPrice = Converting.ToDecimal(reader["Q4MinPrice"].ToString());
                        mapInfo.Q4AvgPrice = Converting.ToDecimal(reader["Q4AvgPrice"].ToString());
                        mapInfo.Shape = reader["Shape"].ToString();
                        MapInfoList.Add(mapInfo);

                    }

                    result.MapInfoList = MapInfoList;
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }
        /// <summary>
        /// Section 4
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public List<PROJECT_IMPACTDto> GetPROJECT_IMPACT(PROJECT_IMPACTDto search)
        {
            IDataReader reader = null;
            List<PROJECT_IMPACTDto> result = null;
            PROJECT_IMPACTDto data = null;
            var p = new DynamicParameters();
            p.Add("@SUBJECT_NAME", search.SUBJECT_NAME);
            p.Add("@PROVINCE_ID", search.PROVINCE_ID, dbType: DbType.String);
            p.Add("@AMPHOE_ID", search.AMPHOE_ID, dbType: DbType.String);
            p.Add("@TAMBOL_ID", search.TAMBOL_ID, dbType: DbType.String);


            try
            {
                result = new List<PROJECT_IMPACTDto>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("sp_PROJECT_IMPACT_FindByColumn", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        data = new Models.PROJECT_IMPACTDto();
                        data.ID = reader["ID"].ToString();
                        data.SUBJECT_ID = reader["SUBJECT_ID"].ToString();
                        data.SUBJECT_NAME = reader["SUBJECT_NAME"].ToString();
                        data.CREATE_DATE = reader["CREATE_DATE"].ToString();
                        data.CREATE_BY = reader["CREATE_BY"].ToString();
                        data.UPDATE_DATE = reader["UPDATE_DATE"].ToString();
                        data.UPDATE_BY = reader["UPDATE_BY"].ToString();
                        data.PUBLISH_DATE = reader["PUBLISH_DATE"].ToString();
                        data.IS_PUBLISHED = reader["IS_PUBLISHED"].ToString();
                        data.PROVINCE_ID = reader["PROVINCE_ID"].ToString();
                        data.ProvinceName = reader["ProvinceName"].ToString();
                        data.Description = reader["Description"].ToString();
                        data.ShapeText = reader["ShapeText"].ToString();
                        data.AMPHOE_ID = reader["AMPHOE_ID"].ToString();
                        data.AmphoeName = reader["AmphoeName"].ToString();
                        data.TAMBOL_ID = reader["TAMBOL_ID"].ToString();
                        data.TambolName = reader["TambolName"].ToString();
                        data.Shape = reader["Shape"].ToString();

                        result.Add(data);

                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }

        /// <summary>
        /// Section 1
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public EstimateDataAll GetSection1EstimateList(SearchMap search)
        {
            IDataReader reader = null;
            EstimateDataAll result = null;

            List<EstimateDataType> EstimateDataTypeList = new List<EstimateDataType>();
            EstimateDataType EstimateDataType = null;
            List<EstimateDataDetail> EstimateDataDetailList = new List<EstimateDataDetail>();
            EstimateDataDetail EstimateDataDetail = null;

            var p = new DynamicParameters();
            p.Add("@SelectType", (int)search.EstimateType); // tab section
            p.Add("@Code", search.Code, dbType: DbType.String);


            try
            {
                result = new EstimateDataAll();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("sp_Section1_EstimateList", p, commandType: CommandType.StoredProcedure);

                    while (reader.Read())
                    {
                        EstimateDataType = new EstimateDataType();
                        EstimateDataType.Code = reader["Code"].ToString();
                        EstimateDataType.Name = reader["Name"].ToString();


                        EstimateDataTypeList.Add(EstimateDataType);

                    }
                    result.EstimateDataTypeList = EstimateDataTypeList;
                    reader.NextResult();

                    while (reader.Read())
                    {
                        EstimateDataDetail = new EstimateDataDetail();
                        //  EstimateDataDetail.Name= reader["Name"].ToString();
                        EstimateDataDetail.Title = reader["Title"].ToString();
                        EstimateDataDetail.Value = reader["Value"].ToString();
                        EstimateDataDetail.Id = reader["Id"].ToString();

                        EstimateDataDetailList.Add(EstimateDataDetail);

                    }

                    result.EstimateDataDetailList = EstimateDataDetailList;
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }

        public dynamic GetChanodDetail(string objectId, string changwatCode, string chanod_no)
        {
            using (IDbConnection conn = CreateConnection())
            {
                #region Query 
                var sql = @"
                        SELECT P.OBJECTID, P.UTMMAP1, P.UTMMAP3 , P.PARCEL_TYPE, P.BRANCH_CODE, P.CHANOD_NO, LAND_NO, CHANGWAT_CODE, AMPHUR_CODE, TUMBON_CODE,
						PROV.NAME_T AS CHANGWAT_NAME, AMPH.NAME_T AS AMPHUR_NAME , TAMBOL.NAME_T AS TUMBON_NAME, VAL.SURVEY_NO,
                        VAL.VAL_AMT, VAL.NNHAN, VAL.NRAI, VAL.NWAH, VAL.DREMAIN
                        FROM [PARCEL_{1}_{0}] P
                        LEFT JOIN (
	                        SELECT V.BRANCH_CODE,V.VAL_P_WA, V.VAL_AMT, H.NNHAN, H.NRAI, H.NWAH, H.DREMAIN ,
	                        V.UTM_CODE,V.UTM_NO_P,V.UTM_NO,V.UTM_PAGE,V.UTM_RATIO,V.UTM_LANDNO,V.CHANODE_NO , H.SURVEY_NO
	                        FROM [land].[dbo].[parcel_val_{0}] V
	                        LEFT JOIN [land].[dbo].[parcel_hd_{0}] H
	                        ON V.UTM_CODE = H.UTM_CODE AND V.UTM_NO_P = H.UTM_NO_P 
	                        AND V.UTM_NO = H.UTM_NO AND V.UTM_PAGE = H.UTM_PAGE AND V.UTM_RATIO = H.UTM_RATIO
	                        AND V.UTM_LANDNO = H.UTM_LANDNO AND V.CHANODE_NO = H.CHANODE_NO
	                        AND V.BRANCH_CODE = H.BRANCH_CODE
							AND V.CHANODE_NO = @CHANOD_CODE
                        ) VAL
	 	                ON VAL.UTM_CODE = P.UTMMAP1 AND VAL.UTM_NO_P = P.UTMMAP2 AND VAL.UTM_NO = P.UTMMAP3 
		                AND VAL.UTM_PAGE = P.UTMMAP4 AND VAL.UTM_RATIO = P.UTMSCALE AND VAL.UTM_LANDNO = P.LAND_NO
						LEFT JOIN [province] PROV
						ON PROV.PRO_C = P.CHANGWAT_CODE
						LEFT JOIN [amphoe] AMPH
						ON AMPH.DIS_C = CONCAT(P.CHANGWAT_CODE, P.AMPHUR_CODE)
						LEFT JOIN [tambol] TAMBOL
						ON TAMBOL.SUB_C = CONCAT(P.CHANGWAT_CODE, P.AMPHUR_CODE, P.TUMBON_CODE)
						WHERE P.OBJECTID = @OBJECT_ID;
                        ";
                #endregion
                var check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 47", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {
                    var obj = conn.Query<dynamic>(string.Format(sql, changwatCode, (int)THAILAND_ZONE.TH_ZONE_47), new { OBJECT_ID = objectId, CHANOD_CODE = chanod_no }).FirstOrDefault();
                    if (obj != null) return obj;
                }

                check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 48", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {
                    var obj = conn.Query<dynamic>(string.Format(sql, changwatCode, (int)THAILAND_ZONE.TH_ZONE_48), new { OBJECT_ID = objectId, CHANOD_CODE = chanod_no }).FirstOrDefault();
                    if (obj != null) return obj;
                }
            }

            return null;
        }

        public dynamic GetNS3KDetail(string objectId, string changwatCode, string chanod_no)
        {
            using (IDbConnection conn = CreateConnection())
            {
                #region Query 
                var sql = @"
                        SELECT P.OBJECTID, P.UTMMAP1, P.UTMMAP3 , P.PARCEL_TYPE, P.BRANCH_CODE, P.NS3A_ID AS CHANOD_NO, LAND_NO, CHANGWAT_CODE, AMPHUR_CODE, TUMBON_CODE,
						PROV.NAME_T AS CHANGWAT_NAME, AMPH.NAME_T AS AMPHUR_NAME , TAMBOL.NAME_T AS TUMBON_NAME, VAL.SURVEY_NO,
                        VAL.VAL_AMT, VAL.NNHAN, VAL.NRAI, VAL.NWAH, VAL.DREMAIN
                        FROM [PARCEL_{1}_NS3K_{0}] P
                        LEFT JOIN (
	                        SELECT V.BRANCH_CODE,V.VAL_P_WA, V.VAL_AMT, H.NNHAN, H.NRAI, H.NWAH, H.DREMAIN ,
	                        V.UTM_CODE,V.UTM_NO_P,V.UTM_NO,V.UTM_PAGE,V.UTM_RATIO,V.UTM_LANDNO,V.NS3A_NO, H.SURVEY_NO 
	                        FROM [land].[dbo].[parcel_val_{0}] V
	                        LEFT JOIN [land].[dbo].[parcel_hd_{0}] H
	                        ON V.UTM_CODE = H.UTM_CODE AND V.UTM_NO_P = H.UTM_NO_P 
	                        AND V.UTM_NO = H.UTM_NO AND V.UTM_PAGE = H.UTM_PAGE AND V.UTM_RATIO = H.UTM_RATIO
	                        AND V.UTM_LANDNO = H.UTM_LANDNO AND V.NS3A_NO = H.NS3A_NO
	                        AND V.BRANCH_CODE = H.BRANCH_CODE
							AND V.NS3A_NO = @NS3A_NO
                        ) VAL
                        ON VAL.UTM_CODE = P.UTMMAP1 AND VAL.UTM_NO_P = P.UTMMAP2 AND VAL.UTM_NO = P.UTMMAP3 
		                AND VAL.UTM_PAGE = P.UTMMAP4 AND VAL.UTM_RATIO = P.UTMSCALE AND VAL.UTM_LANDNO = P.LAND_NO
						LEFT JOIN [province] PROV
						ON PROV.PRO_C = P.CHANGWAT_CODE
						LEFT JOIN [amphoe] AMPH
						ON AMPH.DIS_C = CONCAT(P.CHANGWAT_CODE, P.AMPHUR_CODE)
						LEFT JOIN [tambol] TAMBOL
						ON TAMBOL.SUB_C = CONCAT(P.CHANGWAT_CODE, P.AMPHUR_CODE, P.TUMBON_CODE)
						WHERE P.OBJECTID = @OBJECT_ID;
                        ";
                #endregion
                var check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 47", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {
                    var obj = conn.Query<dynamic>(string.Format(sql, changwatCode, (int)THAILAND_ZONE.TH_ZONE_47), new { OBJECT_ID = objectId, NS3A_NO = chanod_no }).FirstOrDefault();
                    if (obj != null) return obj;
                }

                check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 48", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {
                    var obj = conn.Query<dynamic>(string.Format(sql, changwatCode, (int)THAILAND_ZONE.TH_ZONE_48), new { OBJECT_ID = objectId, NS3A_NO = chanod_no }).FirstOrDefault();
                    if (obj != null) return obj;
                }


            }

            return null;
        }

        public List<dynamic> GetChanods(List<dynamic> shapes, string changwatCode, string radius, string[] branchCodes)
        {
            using (IDbConnection conn = CreateConnection())
            {
                List<dynamic> result = new List<dynamic>();
                #region Query
                var sql = @"
                        SELECT P.OBJECTID, UTMMAP1,UTMMAP2,UTMMAP3,UTMMAP4,UTMSCALE,LAND_NO,CHANOD_NO,
                        VAL.VAL_P_WA, VAL.VAL_AMT, VAL.NNHAN, VAL.NRAI, VAL.NWAH, VAL.DREMAIN
                        FROM [PARCEL_{1}_{0}] P
                        LEFT JOIN (
	                        SELECT V.BRANCH_CODE,V.VAL_P_WA, V.VAL_AMT, H.NNHAN, H.NRAI, H.NWAH, H.DREMAIN ,
	                        V.UTM_CODE,V.UTM_NO_P,V.UTM_NO,V.UTM_PAGE,V.UTM_RATIO,V.UTM_LANDNO,V.CHANODE_NO 
	                        FROM [land].[dbo].[parcel_val_{0}] V
	                        LEFT JOIN [land].[dbo].[parcel_hd_{0}] H
	                        ON V.UTM_CODE = H.UTM_CODE AND V.UTM_NO_P = H.UTM_NO_P 
	                        AND V.UTM_NO = H.UTM_NO AND V.UTM_PAGE = H.UTM_PAGE AND V.UTM_RATIO = H.UTM_RATIO
	                        AND V.UTM_LANDNO = H.UTM_LANDNO AND V.CHANODE_NO = H.CHANODE_NO
	                        AND V.BRANCH_CODE = H.BRANCH_CODE
                        ) VAL
                        ON VAL.UTM_CODE = P.UTMMAP1 AND VAL.UTM_NO_P = P.UTMMAP2 AND VAL.UTM_NO = P.UTMMAP3 
		                AND VAL.UTM_PAGE = P.UTMMAP4 AND VAL.UTM_RATIO = P.UTMSCALE AND VAL.UTM_LANDNO = P.LAND_NO
                        WHERE geometry::STGeomFromText(@POINT, @SRID).STBuffer(@BUFFER).STIntersects(SHAPE) = 1 
                        AND (@BRANCH_CODE IS NULL OR P.BRANCH_CODE IN @BRANCH_CODE)";
                #endregion
                var check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 47", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {

                    var shape47 = shapes.FirstOrDefault(s => s.srid == SRID_24047);
                    var parcels47 = conn.Query<dynamic>(string.Format(sql, changwatCode, (int)THAILAND_ZONE.TH_ZONE_47),
                        new { POINT = Convert.ToString(shape47.shape), SRID = SRID_24047, BUFFER = radius, BRANCH_CODE = branchCodes }).ToList();
                    result.AddRange(parcels47);
                }

                check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 48", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {
                    var shape48 = shapes.FirstOrDefault(s => s.srid == SRID_24048);
                    var parcels48 = conn.Query<dynamic>(string.Format(sql, changwatCode, (int)THAILAND_ZONE.TH_ZONE_48),
                        new { POINT = Convert.ToString(shape48.shape), SRID = SRID_24048, BUFFER = radius, BRANCH_CODE = branchCodes }).ToList();
                    result.AddRange(parcels48);
                }

                return result;
            }
        }

        public List<dynamic> GetNS3Ks(List<dynamic> shapes, string changwatCode, string radius, string[] branchCodes)
        {
            using (IDbConnection conn = CreateConnection())
            {
                List<dynamic> result = new List<dynamic>();
                #region Query
                var sql = @"
                         SELECT P.OBJECTID, UTMMAP1,UTMMAP2,UTMMAP3,UTMMAP4,UTMSCALE,LAND_NO,NS3A_ID AS CHANOD_NO,
                        VAL.VAL_P_WA, VAL.VAL_AMT, VAL.NNHAN, VAL.NRAI, VAL.NWAH, VAL.DREMAIN
                        FROM [PARCEL_{1}_NS3K_{0}] P
                        LEFT JOIN (
	                        SELECT V.BRANCH_CODE,V.VAL_P_WA, V.VAL_AMT, H.NNHAN, H.NRAI, H.NWAH, H.DREMAIN ,
	                        V.UTM_CODE,V.UTM_NO_P,V.UTM_NO,V.UTM_PAGE,V.UTM_RATIO,V.UTM_LANDNO,V.NS3A_NO 
	                        FROM [land].[dbo].[ns3a_val_{0}] V
	                        LEFT JOIN [land].[dbo].[ns3a_hd_{0}] H
	                        ON V.UTM_CODE = H.UTM_CODE AND V.UTM_NO_P = H.UTM_NO_P 
	                        AND V.UTM_NO = H.UTM_NO AND V.UTM_PAGE = H.UTM_PAGE AND V.UTM_RATIO = H.UTM_RATIO
	                        AND V.UTM_LANDNO = H.UTM_LANDNO AND V.NS3A_NO = H.NS3A_NO
	                        AND V.BRANCH_CODE = H.BRANCH_CODE
                        ) VAL
                        ON VAL.UTM_CODE = P.UTMMAP1 AND VAL.UTM_NO_P = P.UTMMAP2 AND VAL.UTM_NO = P.UTMMAP3 
		                AND VAL.UTM_PAGE = P.UTMMAP4 AND VAL.UTM_RATIO = P.UTMSCALE AND VAL.UTM_LANDNO = P.LAND_NO
                        WHERE geometry::STGeomFromText(@POINT, @SRID).STBuffer(@BUFFER).STIntersects(SHAPE) = 1 
                        AND (@BRANCH_CODE IS NULL OR P.BRANCH_CODE IN @BRANCH_CODE)";
                #endregion
                var check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 47", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {

                    var shape47 = shapes.FirstOrDefault(s => s.srid == SRID_24047);
                    var parcels47 = conn.Query<dynamic>(string.Format(sql, changwatCode, (int)THAILAND_ZONE.TH_ZONE_47),
                        new { POINT = Convert.ToString(shape47.shape), SRID = SRID_24047, BUFFER = radius, BRANCH_CODE = branchCodes }).ToList();
                    result.AddRange(parcels47);
                }

                check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 48", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {
                    var shape48 = shapes.FirstOrDefault(s => s.srid == SRID_24048);
                    var parcels48 = conn.Query<dynamic>(string.Format(sql, changwatCode, (int)THAILAND_ZONE.TH_ZONE_48),
                        new { POINT = Convert.ToString(shape48.shape), SRID = SRID_24048, BUFFER = radius, BRANCH_CODE = branchCodes }).ToList();
                    result.AddRange(parcels48);
                }

                return result;
            }
        }

        public POI GetPOI(string id)
        {
            using (IDbConnection conn = CreateConnection())
            {
                return conn.Query<POI>("SELECT OBJECTID, NAME_T FROM [POI] WHERE OBJECTID = @OBJECTID", new { OBJECTID = id }).FirstOrDefault();
            }
        }

        public List<dynamic> GetStreets(string changwatCode, string amphurCode, string tumbonCode)
        {
            using (IDbConnection conn = CreateConnection())
            {
                List<dynamic> result = new List<dynamic>();
                #region Qeury
                var sql = @" 
                      SELECT OBJECTID, STREET_NAME, STREET_NO, STREET_CODE, CHANGWAT_CODE, AMPHUR_CODE, TUMBON_CODE FROM [ROAD_{0}]
                      WHERE CHANGWAT_CODE = @CHANGWAT_CODE AND( @AMPHUR_CODE IS NULL OR AMPHUR_CODE = @AMPHUR_CODE) 
                      AND  (@TUMBON_CODE IS NULL OR TUMBON_CODE = @TUMBON_CODE)";


                #endregion

                var check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 47", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {
                    var streets = conn.Query<dynamic>(string.Format(sql, (int)THAILAND_ZONE.TH_ZONE_48), new
                    {
                        CHANGWAT_CODE = changwatCode,
                        AMPHUR_CODE = amphurCode,
                        TUMBON_CODE = tumbonCode,
                    });

                    if (streets.Count() > 0)
                    {
                        result.AddRange(streets);
                    }
                }

                check = conn.Query<int>(@"SELECT 1 FROM [PROVINCE_ZONE] WHERE PROV_CODE = @PROV_CODE AND ZONE = 48", new { PROV_CODE = changwatCode }).FirstOrDefault();
                if (check > 0)
                {
                    var streets = conn.Query<dynamic>(string.Format(sql, (int)THAILAND_ZONE.TH_ZONE_48), new
                    {
                        CHANGWAT_CODE = changwatCode,
                        AMPHUR_CODE = amphurCode,
                        TUMBON_CODE = tumbonCode,
                    });

                    if (streets.Count() > 0)
                    {
                        result.AddRange(streets);
                    }
                }

                return result;
            }
        }

        public List<dynamic> GetCondos(string changwatCode, string amphurCode, string tumbonCode, string branchCode, string raduis)
        {
            using (IDbConnection conn = CreateConnection())
            {
                var result = new List<dynamic>();

                #region Query
                var sql = @"
                      SELECT P.CONDO_NAME, P.BRANCH AS BRANCH_CODE, V.CHANODE_PRICE, V.CHANODE_VAL_AMT, V.CHANODE_VAL, V.CHANODE_PRICE_AMT, V.CHANODE_NO, V.LANDNO   
                      FROM [condo].[dbo].[NCONDOS] P LEFT JOIN (
                      SELECT C.BRANCH, C.CHANGWAT_CODE, C.CHANODE_SEQ, C.N_REGIST_NO, V.CHANODE_PRICE, V.CHANODE_VAL_AMT, 
                      V.CHANODE_VAL, V.CHANODE_PRICE_AMT, C.CHANODE_NO, C.LANDNO 
                      FROM [condo].[dbo].[NCONDO_CHANODE] C LEFT JOIN [condo].[dbo].[NCONDO_CHANODE_VAL] V
                      ON C.BRANCH = V.BRANCH AND C.CHANGWAT_CODE = V.CHANGWAT_CODE
                      AND C.CHANODE_SEQ = V.CHANODE_SEQ AND C.N_REGIST_NO = V.N_REGIST_NO ) V
                      ON P.BRANCH = V.BRANCH AND P.CHANGWAT_CODE = V.CHANGWAT_CODE
                      AND P.N_REGIST_NO = V.N_REGIST_NO 
                      WHERE CHANGWAT_CODE = @CHANGWAT_CODE AND( @AMPHUR_CODE IS NULL OR AMPHUR_CODE = @AMPHUR_CODE) 
                      AND (@TUMBON_CODE IS NULL OR TUMBON_CODE = @TUMBON_CODE)
                      AND (@BRANCH_CODE IS NULL OR BRANCH = @BRANCH_CODE)";
                #endregion

                var condos = conn.Query<dynamic>(sql, new
                {
                    CHANGWAT_CODE = changwatCode,
                    AMPHUR_CODE = amphurCode,
                    TUMBON_CODE = tumbonCode,
                    BRANCH_CODE = branchCode,
                });

                if (condos.Count() > 0) { result.AddRange(condos); }

                return result;
            }
        }

        /// <summary>
        /// Home>Menu2
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public List<CondoInfo> GetCondoCompare(SearchMap search)
        {

            IDataReader reader = null;
            RegisterLand result = null;
            RegisterLandSummary regSummaryData = null;
            RegisterLandByMonth regSummarybByMonthData = null;
            List<CondoInfo> resultList = null;
            CondoInfo data = null;
            var p = new DynamicParameters();
            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@Code", search.Code, dbType: DbType.String);
            p.Add("@FromYM", search.FromYearMonth, dbType: DbType.String);
            p.Add("@ToYM", search.ToYearMonth, dbType: DbType.String);



            try
            {
                resultList = new List<CondoInfo>();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader("[GetCondoRegisterMenu2]", p, commandType: CommandType.StoredProcedure);


                    reader.NextResult();

                    while (reader.Read())
                    {
                        data = new CondoInfo();
                        data.CondoName = reader["Name"].ToString();
                        data.PriceMet = Converting.ToMonthShortName(reader["RVAL_P_WAH"].ToString());
                        data.PriceSale = reader["RVAL_AMT"].ToString();
                        data.Month = Converting.ToInt(reader["Month"].ToString());
                        data.Year = Converting.ToInt(reader["Year"].ToString());
                        resultList.Add(data);

                    }



                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return resultList;
        }

        public CondoRegister GetCondoRegisterMenu2(SearchMap search)
        {
            /*  @SectionType nvarchar(1), --1 = Region, 2 = Amphur, 3 = Tambol

     @Code nvarchar(50),
     @FromYYMM   nvarchar(10), --yyyyMM

     @ToYYMM   nvarchar(10)--yyyyMM
     */

            CondoRegister result = null;
            DataTable dt = null;
            IDataReader reader = null;

            List<CondoInfo> resultList = null;
            CondoInfo data = null;
            List<YearMonth> yearMonthList = null;

            List<CondoLineGraph> condoGraphList = null;
            CondoLineGraph condoGraph = null;

            var p = new DynamicParameters();
            p.Add("@SectionType", (int)search.SectionType);
            p.Add("@Code", search.Code, dbType: DbType.String);
            p.Add("@FromYYMM", search.FromYearMonth, dbType: DbType.String);
            p.Add("@ToYYMM", search.ToYearMonth, dbType: DbType.String);
            p.Add("@CondoName", search.CondoName, dbType: DbType.String);


            try
            {
                condoGraphList = new List<CondoLineGraph>();
                result = new CondoRegister();
                using (IDbConnection conn = CreateConnectionManage())
                {
                    resultList = new List<CondoInfo>();
                    yearMonthList = new List<YearMonth>();
                    dt = new DataTable();
                    //conn.
                    reader = conn.ExecuteReader("[GetCondoRegisterMenu2]", p, commandType: CommandType.StoredProcedure);


                    while (reader.Read())
                    {
                        data = new CondoInfo();
                        data.CondoName = reader["CondoName"].ToString();
                        data.PriceMet = reader["RVAL_P_WAH"].ToString();
                        data.PriceSale = reader["RVAL_AMT"].ToString();
                        data.Month = Converting.ToInt(reader["Month"].ToString());
                        data.Year = Converting.ToInt(reader["Year"].ToString());
                        data.MonthYearName = reader["MonthYearName"].ToString();

                        if (yearMonthList.Find(o => o.MonthYearName == data.MonthYearName) == null)
                        {
                            yearMonthList.Add(new YearMonth() { MonthYearName = data.MonthYearName });
                        }


                        if (condoGraphList.Find(o => o.name == data.CondoName) == null)
                        {
                            condoGraph = new CondoLineGraph();

                            condoGraph.name = data.CondoName;
                            condoGraph.type = "line";
                            condoGraphList.Add(condoGraph);
                        }



                        resultList.Add(data);

                    }


                    foreach (CondoLineGraph conG in condoGraphList)
                    {
                        conG.data = new List<decimal>();
                        foreach (YearMonth ym in yearMonthList)
                        {

                            data = resultList.Find(c => c.CondoName == conG.name && c.MonthYearName == ym.MonthYearName);

                            conG.data.Add(data != null ? Converting.ToDecimal(data.PriceMet) : 0);
                        }
                    }

                    result.YearMonthList = yearMonthList;
                    result.CondoLineGraphList = condoGraphList;


                    reader.NextResult();
                    dt.Load(reader);
                    result.Table = dt;



                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
            }

            return result;
        }



      
    }
    public class MapSearchCriteria
    {
        public string ID { get; set; }
        public string PriceType { get; set; }
        public string AreaType { get; set; }
        public string CostEstUnitType { get; set; }
        public string CostEstMin { get; set; }
        public string CostEstMax { get; set; }
        public string ChanodeNo { get; set; }
        public SetionType Type { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }
}