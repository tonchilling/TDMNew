

namespace TDM.Models
{

using System;
    
public partial class sp_PROJECT_IMPACT_FindByColumn1_Result
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

    public string ProvinceName { get; set; }

    public string Description { get; set; }

    public string ShapeText { get; set; }

    public string AMPHOE_ID { get; set; }

    public string AmphoeName { get; set; }

    public string TAMBOL_ID { get; set; }

    public string TambolName { get; set; }

}


}
