//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TDM.Models
{
    using System;
    using System.Collections.Generic;

    public enum SetionType
    {
        All = 0,
        Region = 1,
        Provice = 2,
        Amphur = 3,
        Tumbol = 4,

        ProviceByID = 5,
        AmphurByID = 6,
        TumbolByID = 7,
        ChanodeID = 7
    }

    public enum LocationType
    {
        Region = 1,
        Cluster = 2,
        Cluster1 = 47,
        Cluster2 = 48
    }


    public enum EstimateType
    {
        All = 0,
        Land = 1,
        Condo = 2,
        Building = 3

    }

    public partial class SearchMap
    {
        public EstimateType EstimateType { get; set; }
        public SetionType SectionType { get; set; }
        public LocationType LocationType { get; set; }
        public string Code { get; set; }
        public string RegionCode { get; set; }
        public string ProvinceCode { get; set; }
        public string AmphoeCode { get; set; }
        public string TambolCode { get; set; }
        public string ConStructionType { get; set; }
        public string ProvinceCodeCompare1 { get; set; }
        public string ProvinceCodeCompare2 { get; set; }
        public string PercentCompare { get; set; }
        public string ChanodeNo { get; set; }

        public string Month { get; set; }
        public string Year { get; set; }
        public string FromMonth { get; set; }
        public string FromYear { get; set; }
        public string ToMonth { get; set; }
        public string ToYear { get; set; }
        public string FromYearMonth { get; set; }
        public string ToYearMonth { get; set; }
        public string CondoName { get; set; }

    }

    public partial class EstimateDataAll
    {
        public List<EstimateDataType> EstimateDataTypeList { get; set; }
        public List<EstimateDataDetail> EstimateDataDetailList { get; set; }
    }

    public partial class EstimateDataType
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }

    public partial class DropdownObj
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }


    public partial class EstimateDataDetail
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Value { get; set; }
        public string Id { get; set; }
    }

    public class ProjectImpactShapeSearch {
        public int ImportID { get; set; }
        public int PageNo { get; set; }
    }


    public partial class PROJECT_IMPACTDto
    {
        public string ID { get; set; }
        public string SUBJECT_ID { get; set; }
        public string SUBJECT_NAME { get; set; }
        public string CREATE_DATE { get; set; }
        public string CREATE_BY { get; set; }
        public string UPDATE_DATE { get; set; }
        public string UPDATE_BY { get; set; }
        public string PUBLISH_DATE { get; set; }
        public string IS_PUBLISHED { get; set; }
        public string IS_DELETED { get; set; }
        public string PROVINCE_ID { get; set; }
        public string ProvinceName { get; set; }
        public string Description { get; set; }
        public string ShapeText { get; set; }
        public string AMPHOE_ID { get; set; }

        public string AmphoeName { get; set; }
        public string TAMBOL_ID { get; set; }

        public string TambolName { get; set; }
        public string Shape { get; set; }
    }

    public partial class POI
    {
        public int OBJECTID { get; set; }
        public Nullable<int> FID_1 { get; set; }
        public Nullable<int> ID { get; set; }
        public string CODE { get; set; }
        public string SUB_CODE1 { get; set; }
        public string SUB_CODE2 { get; set; }
        public string NAME_E { get; set; }
        public string NAME_T { get; set; }
        public Nullable<decimal> X { get; set; }
        public Nullable<decimal> Y { get; set; }
        public string PROV_NAME_T { get; set; }
        public string PROV_NAME_E { get; set; }
        public string PROV_CODE { get; set; }
        public string AMPH_CODE { get; set; }
        public string AMPH_NAME_T { get; set; }
        public string AMPH_NAME_E { get; set; }
        public string TUMB_CODE { get; set; }
        public string TUMB_NAME_T { get; set; }
        public string TUMB_NAME_E { get; set; }
        public Nullable<System.DateTime> DATE_CREATED { get; set; }
        public string USER_CREATED { get; set; }
        public Nullable<System.DateTime> DATE_UPDATED { get; set; }
        public string USER_UPDATED { get; set; }
        public string POI_TYPE { get; set; }
        public string USER_TYPE { get; set; }
        public System.Data.Entity.Spatial.DbGeometry Shape { get; set; }
        public byte[] GDB_GEOMATTR_DATA { get; set; }
    }





    public partial class EstimateData
    {
        public string DisplayCode { get; set; }
        public string DisplayName { get; set; }
        public string RegionCode { get; set; }
        public string RegionName { get; set; }
        public string ProviceCode { get; set; }
        public string ProviceName { get; set; }
        public string AmphureCode { get; set; }
        public string AmphureName { get; set; }
        public string TAMBOLCode { get; set; }
        public string TAMBOLName { get; set; }

        public string MarketPrice { get; set; }
        public string MarketPriceMin { get; set; }
        public string MarketPriceMax { get; set; }
        public string MarketPriceAvg { get; set; }
        public string MaxMarketAddrCode { get; set; }
        public string MaxMarketCHANODE_NO { get; set; }
        public string MinMarketAddrCode { get; set; }
        public string MinMarketCHANODE_NO { get; set; }

        public string MarketWAHPrice { get; set; }
        public string MarketWAHPriceMin { get; set; }
        public string MarketWAHPriceMax { get; set; }
        public string MarketWAHPriceAvg { get; set; }
        public string MaxMarketWAHAddrCode { get; set; }
        public string MaxMarketWAHCHANODE_NO { get; set; }
        public string MinMarketWAHAddrCode { get; set; }
        public string MinMarketWAHCHANODE_NO { get; set; }


        public string ParcelPrice { get; set; }
        public string ParcelPriceMin { get; set; }
        public string ParcelPriceMax { get; set; }
        public string ParcelPriceAvg { get; set; }
        public string MaxParcelAddrCode { get; set; }
        public string MaxParcelCHANODE_NO { get; set; }
        public string MinParcelAddrCode { get; set; }
        public string MinParcelCHANODE_NO { get; set; }

        public string ParcelWAHPrice { get; set; }
        public string ParcelWAHPriceMin { get; set; }
        public string ParcelWAHPriceMax { get; set; }
        public string ParcelWAHPriceAvg { get; set; }
        public string MaxParcelWAHAddrCode { get; set; }
        public string MaxParcelWAHCHANODE_NO { get; set; }
        public string MinParcelWAHAddrCode { get; set; }
        public string MinParcelWAHCHANODE_NO { get; set; }


        public string LAND_AREA { get; set; }
        public string LAND_Total { get; set; }

        public string ParcelPricePR5 { get; set; } // for construction
        public string MarketColor { get; set; }
        public string ParcelColor { get; set; }
        public string Shape { get; set; }
        public string RegisterNo { get; set; }
        public string LATITUDE { get; set; }
        public string LONGITUDE { get; set; }

        public string Period { get; set; }
        public string ConstructionType { get; set; }
        public string ConstructionName { get; set; }
        public string Price { get; set; }
        public string PricePR5 { get; set; }
        public string CreateDate { get; set; }
        public string REMARK { get; set; }
        public string PriceCompare { get; set; }
        public string Color { get; set; }
        public string CondoName { get; set; }

    }

    public partial class ConstructionData
    {
        public string ProviceCode { get; set; }
        public string ProviceName { get; set; }
        public string Period { get; set; }
        public string ConstructionType { get; set; }
        public string ConstructionName { get; set; }
        public string Price { get; set; }
        public string PricePR5 { get; set; }
        public string CreateDate { get; set; }
        public string REMARK { get; set; }
    }





    public partial class RegisterLand
    {
        public RegisterLandSummary summaryData { get; set; }

        public List<RegisterLandByMonth> summaryByMonthData { get; set; }
    }

    public partial class RegisterLandSummary
    {
        public decimal ParcelRegister { get; set; }
        public decimal ParcelNewRegister { get; set; }
        public decimal ParcelMonthRegister { get; set; }
        public decimal ParcelMonthNewRegister { get; set; }
    }

    public partial class RegisterLandByMonth
    {
        public decimal RegMonth { get; set; }
        public string RegYear { get; set; }
        public string MonthName { get; set; }
        public decimal ParcelRegister { get; set; }
        public decimal ParcelNewRegister { get; set; }

    }

    public partial class YearMonth
    {
        public string MonthYearName { get; set; }
    }

    public partial class CondoInfo
    {
        public string CondoName { get; set; }
        public string PriceMet { get; set; }
        public string PriceSale { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string MonthYearName { get; set; }

    }

    public partial class CondoLineGraph
    {
        //  public string CondoName { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public List<decimal> data { get; set; }
    }

    public partial class CondoRegister
    {
        public List<YearMonth> YearMonthList { get; set; }
        public List<CondoLineGraph> CondoLineGraphList { get; set; }
        public System.Data.DataTable Table { get; set; }
    }


    public partial class LandSalePriceChanging
    {
        public List<MapMenu3> MapInfoList { get; set; }
        public List<DataMenu3> DataList { get; set; }
    }

    public partial class MapMenu3
    {

        public string ProvinceCode { get; set; }

        public string ProvinceName { get; set; }
        public decimal Q1MaxPrice { get; set; }
        public decimal Q1MinPrice { get; set; }
        public decimal Q1AvgPrice { get; set; }

        public decimal Q2MaxPrice { get; set; }
        public decimal Q2MinPrice { get; set; }
        public decimal Q2AvgPrice { get; set; }

        public decimal Q3MaxPrice { get; set; }
        public decimal Q3MinPrice { get; set; }
        public decimal Q3AvgPrice { get; set; }

        public decimal Q4MaxPrice { get; set; }
        public decimal Q4MinPrice { get; set; }
        public decimal Q4AvgPrice { get; set; }
        public string Shape { get; set; }

    }

    public partial class DataMenu3
    {


        public string ProvinceCode { get; set; }

        public string ProvinceName { get; set; }
        public string Quater { get; set; }
        public string Year { get; set; }
        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }
        public decimal AvgPrice { get; set; }
    }



    public partial class Barchart
    {
        public List<string> Data { get; set; }

        public List<BarchartValue> Value { get; set; }
        public List<BarchartValue> Value2 { get; set; }
        public List<BarchartValue2> Value3 { get; set; }
    }


    public partial class BarchartValue
    {

        public string name { get; set; }
        public decimal value { get; set; }
        public string key { get; set; }
    }



    public partial class BarchartValue2
    {

        public decimal xAxis { get; set; }
        public decimal y { get; set; }
        public string name { get; set; }
        public decimal symbolSize { get; set; }
        public string symbol { get; set; }
        public string key { get; set; }
    }

   

    public partial class GetPriceBI
    {
        public List<EstimateData> EstimateData { get; set; }
        public Barchart Barchart { get; set; }
    }



    public partial class Land_Ratio
    {
          public List<Land_RatioDetail> Detail  { get; set; }
    public List<string> Category { get; set; }
        public List<string> Series { get; set; }
    }

    public partial class Land_RatioDetail
    {
        public string  ID { get; set; }
        public string FromYear { get; set; }
        public string ToYear { get; set; }
        public string RegionCode { get; set; }
        public string RegionName { get; set; }
        public string ProvinceCode { get; set; }
        public string ProvinceName { get; set; }
        public string Ratio { get; set; }
        public string CreateDate { get; set; }
        public string CreateBy { get; set; }
        public string UpdateDate { get; set; }
        public string UpdateBy { get; set; }
        public string Shape { get; set; }
        
    }



}


