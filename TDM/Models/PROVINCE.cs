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
    
    public partial class PROVINCE
    {
        public int OBJECTID { get; set; }
        public string ON_PRO_THA { get; set; }
        public string ON_PRO_ENG { get; set; }
        public string PRO_C { get; set; }
        public string NAME_T { get; set; }
        public string NAME_E { get; set; }
        public System.Data.Entity.Spatial.DbGeometry Shape { get; set; }
        public byte[] GDB_GEOMATTR_DATA { get; set; }
    }
}
