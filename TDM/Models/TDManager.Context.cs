﻿

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
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

using System.Data.Entity.Core.Objects;
using System.Linq;


public partial class TDManagementEntities : DbContext
{
    public TDManagementEntities()
        : base("name=TDManagementEntities")
    {

    }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        throw new UnintentionalCodeFirstException();
    }


    public virtual DbSet<PROJECT_IMPACT> PROJECT_IMPACT { get; set; }

    public virtual DbSet<PROV_IMPACT> PROV_IMPACT { get; set; }

    public virtual DbSet<STATUS_IMPACT> STATUS_IMPACT { get; set; }

    public virtual DbSet<PROJECT_IMPACT_GEOMETRY> PROJECT_IMPACT_GEOMETRY { get; set; }

    public virtual DbSet<Land_MARKET_PRICE_L_Region> Land_MARKET_PRICE_L_Region { get; set; }

    public virtual DbSet<PROJECT_IMPACT1> PROJECT_IMPACT1 { get; set; }

    public virtual DbSet<PROJECT_IMPACT_GEOMETRY1> PROJECT_IMPACT_GEOMETRY1 { get; set; }

    public virtual DbSet<PROV_IMPACT1> PROV_IMPACT1 { get; set; }

    public virtual DbSet<STATUS_IMPACT1> STATUS_IMPACT1 { get; set; }

    public virtual DbSet<TemplateDetail> TemplateDetails { get; set; }

    public virtual DbSet<TemplateHeader> TemplateHeaders { get; set; }

    public virtual DbSet<Land_MARKET_PRICE_L_Province> Land_MARKET_PRICE_L_Province { get; set; }

    public virtual DbSet<Log> Logs { get; set; }


    public virtual int GetAllDatabase()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetAllDatabase");
    }


    public virtual ObjectResult<GetAMPHOE_Result> GetAMPHOE(string locationType, string code)
    {

        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetAMPHOE_Result>("GetAMPHOE", locationTypeParameter, codeParameter);
    }


    public virtual ObjectResult<GetCluster_Result> GetCluster()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetCluster_Result>("GetCluster");
    }


    public virtual int GetCondoRegisterMenu2(string sectionType, string code, string fromYYMM, string toYYMM, string condoName)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var fromYYMMParameter = fromYYMM != null ?
            new ObjectParameter("FromYYMM", fromYYMM) :
            new ObjectParameter("FromYYMM", typeof(string));


        var toYYMMParameter = toYYMM != null ?
            new ObjectParameter("ToYYMM", toYYMM) :
            new ObjectParameter("ToYYMM", typeof(string));


        var condoNameParameter = condoName != null ?
            new ObjectParameter("CondoName", condoName) :
            new ObjectParameter("CondoName", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetCondoRegisterMenu2", sectionTypeParameter, codeParameter, fromYYMMParameter, toYYMMParameter, condoNameParameter);
    }


    public virtual ObjectResult<GetConstructionType_Result> GetConstructionType()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetConstructionType_Result>("GetConstructionType");
    }


    public virtual int GetConsturctionPrice(string sectionType, string code, string conStructionType, string provinceCodeCompare1, string provinceCodeCompare2, string percentCompare)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var conStructionTypeParameter = conStructionType != null ?
            new ObjectParameter("ConStructionType", conStructionType) :
            new ObjectParameter("ConStructionType", typeof(string));


        var provinceCodeCompare1Parameter = provinceCodeCompare1 != null ?
            new ObjectParameter("ProvinceCodeCompare1", provinceCodeCompare1) :
            new ObjectParameter("ProvinceCodeCompare1", typeof(string));


        var provinceCodeCompare2Parameter = provinceCodeCompare2 != null ?
            new ObjectParameter("ProvinceCodeCompare2", provinceCodeCompare2) :
            new ObjectParameter("ProvinceCodeCompare2", typeof(string));


        var percentCompareParameter = percentCompare != null ?
            new ObjectParameter("PercentCompare", percentCompare) :
            new ObjectParameter("PercentCompare", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetConsturctionPrice", sectionTypeParameter, codeParameter, conStructionTypeParameter, provinceCodeCompare1Parameter, provinceCodeCompare2Parameter, percentCompareParameter);
    }


    public virtual int GetConsturctionPriceBI(string sectionType, string code, string conStructionType, string provinceCodeCompare1, string provinceCodeCompare2, string percentCompare)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var conStructionTypeParameter = conStructionType != null ?
            new ObjectParameter("ConStructionType", conStructionType) :
            new ObjectParameter("ConStructionType", typeof(string));


        var provinceCodeCompare1Parameter = provinceCodeCompare1 != null ?
            new ObjectParameter("ProvinceCodeCompare1", provinceCodeCompare1) :
            new ObjectParameter("ProvinceCodeCompare1", typeof(string));


        var provinceCodeCompare2Parameter = provinceCodeCompare2 != null ?
            new ObjectParameter("ProvinceCodeCompare2", provinceCodeCompare2) :
            new ObjectParameter("ProvinceCodeCompare2", typeof(string));


        var percentCompareParameter = percentCompare != null ?
            new ObjectParameter("PercentCompare", percentCompare) :
            new ObjectParameter("PercentCompare", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetConsturctionPriceBI", sectionTypeParameter, codeParameter, conStructionTypeParameter, provinceCodeCompare1Parameter, provinceCodeCompare2Parameter, percentCompareParameter);
    }


    public virtual int GetLandPriceCompareMenu3(string sectionType, string locationType, string code, string year, string provinceCodeCompare1)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var yearParameter = year != null ?
            new ObjectParameter("Year", year) :
            new ObjectParameter("Year", typeof(string));


        var provinceCodeCompare1Parameter = provinceCodeCompare1 != null ?
            new ObjectParameter("ProvinceCodeCompare1", provinceCodeCompare1) :
            new ObjectParameter("ProvinceCodeCompare1", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetLandPriceCompareMenu3", sectionTypeParameter, locationTypeParameter, codeParameter, yearParameter, provinceCodeCompare1Parameter);
    }


    public virtual int GetLandRegisterMenu1(string sectionType, string code, string month, string year)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var monthParameter = month != null ?
            new ObjectParameter("Month", month) :
            new ObjectParameter("Month", typeof(string));


        var yearParameter = year != null ?
            new ObjectParameter("Year", year) :
            new ObjectParameter("Year", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetLandRegisterMenu1", sectionTypeParameter, codeParameter, monthParameter, yearParameter);
    }


    public virtual ObjectResult<GetMenu1_Result> GetMenu1(string year)
    {

        var yearParameter = year != null ?
            new ObjectParameter("Year", year) :
            new ObjectParameter("Year", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetMenu1_Result>("GetMenu1", yearParameter);
    }


    public virtual int GetPrice(string sectionType, string code, string chanodeNo)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var chanodeNoParameter = chanodeNo != null ?
            new ObjectParameter("ChanodeNo", chanodeNo) :
            new ObjectParameter("ChanodeNo", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPrice", sectionTypeParameter, codeParameter, chanodeNoParameter);
    }


    public virtual int GetPrice_Condo(string sectionType, string code)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPrice_Condo", sectionTypeParameter, codeParameter);
    }


    public virtual int GetPrice_CondoBI(string sectionType, string code, string locationType)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPrice_CondoBI", sectionTypeParameter, codeParameter, locationTypeParameter);
    }


    public virtual int GetPrice_Parcel(string regionCode, string provinceCode, string amphureCode, string tumbolCode, string chanodeNo)
    {

        var regionCodeParameter = regionCode != null ?
            new ObjectParameter("RegionCode", regionCode) :
            new ObjectParameter("RegionCode", typeof(string));


        var provinceCodeParameter = provinceCode != null ?
            new ObjectParameter("ProvinceCode", provinceCode) :
            new ObjectParameter("ProvinceCode", typeof(string));


        var amphureCodeParameter = amphureCode != null ?
            new ObjectParameter("AmphureCode", amphureCode) :
            new ObjectParameter("AmphureCode", typeof(string));


        var tumbolCodeParameter = tumbolCode != null ?
            new ObjectParameter("TumbolCode", tumbolCode) :
            new ObjectParameter("TumbolCode", typeof(string));


        var chanodeNoParameter = chanodeNo != null ?
            new ObjectParameter("ChanodeNo", chanodeNo) :
            new ObjectParameter("ChanodeNo", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPrice_Parcel", regionCodeParameter, provinceCodeParameter, amphureCodeParameter, tumbolCodeParameter, chanodeNoParameter);
    }


    public virtual int GetPrice_ParcelBI(string regionCode, string provinceCode, string amphureCode, string tumbolCode, string chanodeNo, string loactionType)
    {

        var regionCodeParameter = regionCode != null ?
            new ObjectParameter("RegionCode", regionCode) :
            new ObjectParameter("RegionCode", typeof(string));


        var provinceCodeParameter = provinceCode != null ?
            new ObjectParameter("ProvinceCode", provinceCode) :
            new ObjectParameter("ProvinceCode", typeof(string));


        var amphureCodeParameter = amphureCode != null ?
            new ObjectParameter("AmphureCode", amphureCode) :
            new ObjectParameter("AmphureCode", typeof(string));


        var tumbolCodeParameter = tumbolCode != null ?
            new ObjectParameter("TumbolCode", tumbolCode) :
            new ObjectParameter("TumbolCode", typeof(string));


        var chanodeNoParameter = chanodeNo != null ?
            new ObjectParameter("ChanodeNo", chanodeNo) :
            new ObjectParameter("ChanodeNo", typeof(string));


        var loactionTypeParameter = loactionType != null ?
            new ObjectParameter("LoactionType", loactionType) :
            new ObjectParameter("LoactionType", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPrice_ParcelBI", regionCodeParameter, provinceCodeParameter, amphureCodeParameter, tumbolCodeParameter, chanodeNoParameter, loactionTypeParameter);
    }


    public virtual int GetPriceBI(string sectionType, string code, string chanodeNo, string locationType)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var chanodeNoParameter = chanodeNo != null ?
            new ObjectParameter("ChanodeNo", chanodeNo) :
            new ObjectParameter("ChanodeNo", typeof(string));


        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPriceBI", sectionTypeParameter, codeParameter, chanodeNoParameter, locationTypeParameter);
    }


    public virtual int GetPriceBI_bk(string sectionType, string code, string chanodeNo, string locationType)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var chanodeNoParameter = chanodeNo != null ?
            new ObjectParameter("ChanodeNo", chanodeNo) :
            new ObjectParameter("ChanodeNo", typeof(string));


        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPriceBI_bk", sectionTypeParameter, codeParameter, chanodeNoParameter, locationTypeParameter);
    }


    public virtual int GetPriceByZone(string sectionType, string code)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPriceByZone", sectionTypeParameter, codeParameter);
    }


    public virtual int GetPriceRVAL_Land(string sectionType, string code, string chanodeNo, string locationType)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        var chanodeNoParameter = chanodeNo != null ?
            new ObjectParameter("ChanodeNo", chanodeNo) :
            new ObjectParameter("ChanodeNo", typeof(string));


        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetPriceRVAL_Land", sectionTypeParameter, codeParameter, chanodeNoParameter, locationTypeParameter);
    }


    public virtual int GetProvince(string locationType, string code)
    {

        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetProvince", locationTypeParameter, codeParameter);
    }


    public virtual ObjectResult<GetTAMBOL_Result> GetTAMBOL(string locationType, string code)
    {

        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetTAMBOL_Result>("GetTAMBOL", locationTypeParameter, codeParameter);
    }


    public virtual int sp_CheckRealPrice(string tumbolCode)
    {

        var tumbolCodeParameter = tumbolCode != null ?
            new ObjectParameter("TumbolCode", tumbolCode) :
            new ObjectParameter("TumbolCode", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_CheckRealPrice", tumbolCodeParameter);
    }


    public virtual ObjectResult<sp_construction_dropdownlist_Result> sp_construction_dropdownlist()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_construction_dropdownlist_Result>("sp_construction_dropdownlist");
    }


    public virtual int sp_GetAddressList()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_GetAddressList");
    }


    public virtual ObjectResult<sp_GetGraphList_Result> sp_GetGraphList(string templateID)
    {

        var templateIDParameter = templateID != null ?
            new ObjectParameter("TemplateID", templateID) :
            new ObjectParameter("TemplateID", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_GetGraphList_Result>("sp_GetGraphList", templateIDParameter);
    }


    public virtual int sp_GetLandRatio(string sectionType, string code)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_GetLandRatio", sectionTypeParameter, codeParameter);
    }


    public virtual ObjectResult<Nullable<int>> sp_GetLandRegisterYear()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("sp_GetLandRegisterYear");
    }


    public virtual int sp_Import_Parcel()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_Import_Parcel");
    }


    public virtual int sp_ImportGeneratePriceByTumbol()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_ImportGeneratePriceByTumbol");
    }


    public virtual ObjectResult<sp_land_dropdownlist_Result> sp_land_dropdownlist()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_land_dropdownlist_Result>("sp_land_dropdownlist");
    }


    public virtual ObjectResult<sp_PROJECT_IMPACT_FindByColumn_Result> sp_PROJECT_IMPACT_FindByColumn(string sUBJECT_NAME, string pROVINCE_ID, string aMPHOE_ID, string tAMBOL_ID)
    {

        var sUBJECT_NAMEParameter = sUBJECT_NAME != null ?
            new ObjectParameter("SUBJECT_NAME", sUBJECT_NAME) :
            new ObjectParameter("SUBJECT_NAME", typeof(string));


        var pROVINCE_IDParameter = pROVINCE_ID != null ?
            new ObjectParameter("PROVINCE_ID", pROVINCE_ID) :
            new ObjectParameter("PROVINCE_ID", typeof(string));


        var aMPHOE_IDParameter = aMPHOE_ID != null ?
            new ObjectParameter("AMPHOE_ID", aMPHOE_ID) :
            new ObjectParameter("AMPHOE_ID", typeof(string));


        var tAMBOL_IDParameter = tAMBOL_ID != null ?
            new ObjectParameter("TAMBOL_ID", tAMBOL_ID) :
            new ObjectParameter("TAMBOL_ID", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_PROJECT_IMPACT_FindByColumn_Result>("sp_PROJECT_IMPACT_FindByColumn", sUBJECT_NAMEParameter, pROVINCE_IDParameter, aMPHOE_IDParameter, tAMBOL_IDParameter);
    }


    public virtual ObjectResult<sp_Section1_EstimateList_Result> sp_Section1_EstimateList(string selectType, string code)
    {

        var selectTypeParameter = selectType != null ?
            new ObjectParameter("SelectType", selectType) :
            new ObjectParameter("SelectType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_Section1_EstimateList_Result>("sp_Section1_EstimateList", selectTypeParameter, codeParameter);
    }


    public virtual int sp_TemplateDetail_Insert(string templateID, string no, string graphID, string title, string width, string color, string x, string y, string desc, string xAxisData, string yAxisData, string connection, string chart, string sortNo)
    {

        var templateIDParameter = templateID != null ?
            new ObjectParameter("TemplateID", templateID) :
            new ObjectParameter("TemplateID", typeof(string));


        var noParameter = no != null ?
            new ObjectParameter("No", no) :
            new ObjectParameter("No", typeof(string));


        var graphIDParameter = graphID != null ?
            new ObjectParameter("GraphID", graphID) :
            new ObjectParameter("GraphID", typeof(string));


        var titleParameter = title != null ?
            new ObjectParameter("Title", title) :
            new ObjectParameter("Title", typeof(string));


        var widthParameter = width != null ?
            new ObjectParameter("Width", width) :
            new ObjectParameter("Width", typeof(string));


        var colorParameter = color != null ?
            new ObjectParameter("Color", color) :
            new ObjectParameter("Color", typeof(string));


        var xParameter = x != null ?
            new ObjectParameter("x", x) :
            new ObjectParameter("x", typeof(string));


        var yParameter = y != null ?
            new ObjectParameter("y", y) :
            new ObjectParameter("y", typeof(string));


        var descParameter = desc != null ?
            new ObjectParameter("Desc", desc) :
            new ObjectParameter("Desc", typeof(string));


        var xAxisDataParameter = xAxisData != null ?
            new ObjectParameter("xAxisData", xAxisData) :
            new ObjectParameter("xAxisData", typeof(string));


        var yAxisDataParameter = yAxisData != null ?
            new ObjectParameter("yAxisData", yAxisData) :
            new ObjectParameter("yAxisData", typeof(string));


        var connectionParameter = connection != null ?
            new ObjectParameter("Connection", connection) :
            new ObjectParameter("Connection", typeof(string));


        var chartParameter = chart != null ?
            new ObjectParameter("Chart", chart) :
            new ObjectParameter("Chart", typeof(string));


        var sortNoParameter = sortNo != null ?
            new ObjectParameter("SortNo", sortNo) :
            new ObjectParameter("SortNo", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_TemplateDetail_Insert", templateIDParameter, noParameter, graphIDParameter, titleParameter, widthParameter, colorParameter, xParameter, yParameter, descParameter, xAxisDataParameter, yAxisDataParameter, connectionParameter, chartParameter, sortNoParameter);
    }


    public virtual ObjectResult<sp_TemplateHeader_dropdownlist_Result> sp_TemplateHeader_dropdownlist()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_TemplateHeader_dropdownlist_Result>("sp_TemplateHeader_dropdownlist");
    }


    public virtual int sp_TemplateHeader_Insert(ObjectParameter templateID, string name)
    {

        var nameParameter = name != null ?
            new ObjectParameter("Name", name) :
            new ObjectParameter("Name", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_TemplateHeader_Insert", templateID, nameParameter);
    }


    public virtual ObjectResult<GetTAMBOL1_Result> GetTAMBOL1(string locationType, string code)
    {

        var locationTypeParameter = locationType != null ?
            new ObjectParameter("LocationType", locationType) :
            new ObjectParameter("LocationType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetTAMBOL1_Result>("GetTAMBOL1", locationTypeParameter, codeParameter);
    }


    public virtual int sp_GetLandRatio1(string sectionType, string code)
    {

        var sectionTypeParameter = sectionType != null ?
            new ObjectParameter("SectionType", sectionType) :
            new ObjectParameter("SectionType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_GetLandRatio1", sectionTypeParameter, codeParameter);
    }


    public virtual ObjectResult<Nullable<int>> sp_GetLandRegisterYear1()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("sp_GetLandRegisterYear1");
    }


    public virtual int sp_Import_LandPrice()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_Import_LandPrice");
    }


    public virtual ObjectResult<sp_land_dropdownlist1_Result> sp_land_dropdownlist1()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_land_dropdownlist1_Result>("sp_land_dropdownlist1");
    }


    public virtual ObjectResult<sp_PROJECT_IMPACT_FindByColumn1_Result> sp_PROJECT_IMPACT_FindByColumn1(string sUBJECT_NAME, string pROVINCE_ID, string aMPHOE_ID, string tAMBOL_ID)
    {

        var sUBJECT_NAMEParameter = sUBJECT_NAME != null ?
            new ObjectParameter("SUBJECT_NAME", sUBJECT_NAME) :
            new ObjectParameter("SUBJECT_NAME", typeof(string));


        var pROVINCE_IDParameter = pROVINCE_ID != null ?
            new ObjectParameter("PROVINCE_ID", pROVINCE_ID) :
            new ObjectParameter("PROVINCE_ID", typeof(string));


        var aMPHOE_IDParameter = aMPHOE_ID != null ?
            new ObjectParameter("AMPHOE_ID", aMPHOE_ID) :
            new ObjectParameter("AMPHOE_ID", typeof(string));


        var tAMBOL_IDParameter = tAMBOL_ID != null ?
            new ObjectParameter("TAMBOL_ID", tAMBOL_ID) :
            new ObjectParameter("TAMBOL_ID", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_PROJECT_IMPACT_FindByColumn1_Result>("sp_PROJECT_IMPACT_FindByColumn1", sUBJECT_NAMEParameter, pROVINCE_IDParameter, aMPHOE_IDParameter, tAMBOL_IDParameter);
    }


    public virtual ObjectResult<sp_Section1_EstimateList1_Result> sp_Section1_EstimateList1(string selectType, string code)
    {

        var selectTypeParameter = selectType != null ?
            new ObjectParameter("SelectType", selectType) :
            new ObjectParameter("SelectType", typeof(string));


        var codeParameter = code != null ?
            new ObjectParameter("Code", code) :
            new ObjectParameter("Code", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_Section1_EstimateList1_Result>("sp_Section1_EstimateList1", selectTypeParameter, codeParameter);
    }


    public virtual int sp_TemplateDetail_Insert1(string templateID, string no, string graphID, string title, string width, string color, string x, string y, string desc, string xAxisData, string yAxisData, string connection, string chart, string sortNo)
    {

        var templateIDParameter = templateID != null ?
            new ObjectParameter("TemplateID", templateID) :
            new ObjectParameter("TemplateID", typeof(string));


        var noParameter = no != null ?
            new ObjectParameter("No", no) :
            new ObjectParameter("No", typeof(string));


        var graphIDParameter = graphID != null ?
            new ObjectParameter("GraphID", graphID) :
            new ObjectParameter("GraphID", typeof(string));


        var titleParameter = title != null ?
            new ObjectParameter("Title", title) :
            new ObjectParameter("Title", typeof(string));


        var widthParameter = width != null ?
            new ObjectParameter("Width", width) :
            new ObjectParameter("Width", typeof(string));


        var colorParameter = color != null ?
            new ObjectParameter("Color", color) :
            new ObjectParameter("Color", typeof(string));


        var xParameter = x != null ?
            new ObjectParameter("x", x) :
            new ObjectParameter("x", typeof(string));


        var yParameter = y != null ?
            new ObjectParameter("y", y) :
            new ObjectParameter("y", typeof(string));


        var descParameter = desc != null ?
            new ObjectParameter("Desc", desc) :
            new ObjectParameter("Desc", typeof(string));


        var xAxisDataParameter = xAxisData != null ?
            new ObjectParameter("xAxisData", xAxisData) :
            new ObjectParameter("xAxisData", typeof(string));


        var yAxisDataParameter = yAxisData != null ?
            new ObjectParameter("yAxisData", yAxisData) :
            new ObjectParameter("yAxisData", typeof(string));


        var connectionParameter = connection != null ?
            new ObjectParameter("Connection", connection) :
            new ObjectParameter("Connection", typeof(string));


        var chartParameter = chart != null ?
            new ObjectParameter("Chart", chart) :
            new ObjectParameter("Chart", typeof(string));


        var sortNoParameter = sortNo != null ?
            new ObjectParameter("SortNo", sortNo) :
            new ObjectParameter("SortNo", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_TemplateDetail_Insert1", templateIDParameter, noParameter, graphIDParameter, titleParameter, widthParameter, colorParameter, xParameter, yParameter, descParameter, xAxisDataParameter, yAxisDataParameter, connectionParameter, chartParameter, sortNoParameter);
    }


    public virtual ObjectResult<sp_TemplateHeader_dropdownlist1_Result> sp_TemplateHeader_dropdownlist1()
    {

        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_TemplateHeader_dropdownlist1_Result>("sp_TemplateHeader_dropdownlist1");
    }


    public virtual int sp_TemplateHeader_Insert1(ObjectParameter templateID, string name)
    {

        var nameParameter = name != null ?
            new ObjectParameter("Name", name) :
            new ObjectParameter("Name", typeof(string));


        return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_TemplateHeader_Insert1", templateID, nameParameter);
    }

}

}

