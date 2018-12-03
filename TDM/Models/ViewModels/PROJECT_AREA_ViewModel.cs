using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TDM.Models
{
    public class PROJECT_AREA_ViewModel
    {
        public int OBJECTID { get; set; }
        public string SUBJECT_ID { get; set; }
        public Nullable<System.DateTime> PUBLIC_DATE { get; set; }
        public Nullable<System.DateTime> EFFECTIVE_DATE { get; set; }
        public string PROV_CODE { get; set; }
        public string STATUS_PROCESS { get; set; }
        public Nullable<System.DateTime> DATE_CREATED { get; set; }
        public string USER_CREATED { get; set; }
        public Nullable<System.DateTime> DATE_UPDATED { get; set; }
        public string USER_UPDATED { get; set; }
        public System.Data.Entity.Spatial.DbGeometry SHAPE { get; set; }
        public byte[] GDB_GEOMATTR_DATA { get; set; }
    }
}