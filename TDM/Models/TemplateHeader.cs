

namespace TDM.Models
{

using System;
    using System.Collections.Generic;
    
public partial class TemplateHeader
{

    public string TemplateID { get; set; }

    public string Name { get; set; }

    public Nullable<System.DateTime> CreateDate { get; set; }

    public string CreateBy { get; set; }

    public Nullable<System.DateTime> UpdateDate { get; set; }

    public string UpdateBy { get; set; }

    public string Row_State { get; set; }

}


}
