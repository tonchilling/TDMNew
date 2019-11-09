using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TDM.Models.ViewModels
{
    public class ChartTemplate_ViewModel
    {

        public string TemplateID { get; set; }
        public string Name { get; set; }
        public string TemplateType { get; set; }
        public string CreateDate { get; set; }
        public string CreateBy { get; set; }
        public string UpdateDate { get; set; }
        public string UpdateBy { get; set; }
        public string Row_State { get; set; }
        public List<Chart> Charts { get; set; }
    }

    public class Chart {
        public string  No { get; set; }
        public string GraphID { get; set; }
        public string Title { get; set; }
        public string Width { get; set; }
        public string Color { get; set; }
        public string x { get; set; }
        public string y { get; set; }
        public string x2 { get; set; }
        public string y2 { get; set; }
        public string xAxisData { get; set; }
        public string yAxisData { get; set; }
        public string xAxisData2 { get; set; }
        public string yAxisData2 { get; set; }
        public string Desc { get; set; }
        public string Connection { get; set; }
        public string ChartOptions { get; set; }
        public string SortNo { get; set; }

        public string xCaption { get; set; }
        public string x2Caption { get; set; }
        public string yCaption { get; set; }
        public string y2Caption { get; set; }
       
    }

    public class Connnection
    {
        public string Server { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Query { get; set; }
      
}
}