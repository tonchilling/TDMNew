﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TDM.Models.ViewModels
{
    public class MAP_ViewModel
    {

        public string Name { get; set; }
        public decimal MarketPrice { get; set; }
        public decimal MarketWAHPrice { get; set; }
        public decimal MarketPriceMax { get; set; }
        public decimal MarketPriceMin { get; set; }
        public decimal MarketPriceAvg { get; set; }


        public decimal ParcelPrice { get; set; }
        public decimal ParcelWAHPrice { get; set; }
        public decimal ParcelPriceMin { get; set; }
        public decimal ParcelPriceMax { get; set; }
        public decimal ParcelPriceAvg { get; set; }
        public  string LATITUDE { get; set; }
        public string LONGITUDE { get; set; }
        public MapStructureInfo MapStructure { get; set; }

        public bool MaxPrice { get; set; }
        public bool MinPrice { get; set; }

        public string PriceType { get; set; }
        public string CostEstUnitType { get; set; }

        public string AreaType { get; set; }



    }
    public class MapStructureInfo
    {
        public string ParcelDrawingCode { get; set; }
        public string MarketDrawingCode { get; set; }
        public string Shape { get; set; }
    }


    public class AddressList
    {
        public List<PROVINCE> ProvinceList { get; set; }
        public List<AMPHOE> AmphoeList { get; set; }
    public List<TAMBOL> TambolList { get; set; }

    }
}