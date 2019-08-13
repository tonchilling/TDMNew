

namespace TDM.Models
{

using System;
    using System.Collections.Generic;
    
public partial class TemplateDetail
{

    public string TemplateID { get; set; }

    public int No { get; set; }

    public string GraphID { get; set; }

    public string Title { get; set; }

    public string Width { get; set; }

    public string Color { get; set; }

    public string x { get; set; }

    public string y { get; set; }

    public string Desc { get; set; }

    public string Connection { get; set; }

    public string Chart { get; set; }

    public string xAxisData { get; set; }

    public string yAxisData { get; set; }

    public Nullable<int> SortNo { get; set; }

    public Nullable<System.DateTime> CreateDate { get; set; }

    public string CreateBy { get; set; }

    public Nullable<System.DateTime> UpdateDate { get; set; }

    public string UpdateBy { get; set; }

    public string Row_State { get; set; }

}


}
