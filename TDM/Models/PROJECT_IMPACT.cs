

namespace TDM.Models
{

using System;
    using System.Collections.Generic;
    

public partial class PROJECT_IMPACT
{

    public int ID { get; set; }

    public string SUBJECT_ID { get; set; }

    public string SUBJECT_NAME { get; set; }

    public System.DateTime CREATE_DATE { get; set; }

    public string CREATE_BY { get; set; }

    public System.DateTime UPDATE_DATE { get; set; }

    public string UPDATE_BY { get; set; }

    public Nullable<System.DateTime> PUBLISH_DATE { get; set; }

    public bool IS_PUBLISHED { get; set; }

    public bool IS_DELETED { get; set; }

    public string PROVINCE_ID { get; set; }

    public string Description { get; set; }

    public string Shape { get; set; }

    public string AMPHOE_ID { get; set; }

    public string TAMBOL_ID { get; set; }

    public string Area { get; set; }

}


}
