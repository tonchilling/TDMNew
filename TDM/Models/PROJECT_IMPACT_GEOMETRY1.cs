
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
    
public partial class PROJECT_IMPACT_GEOMETRY1
{

    public long ProjectImpactID { get; set; }

    public long ShapeID { get; set; }

    public decimal Area { get; set; }

    public string OriginX { get; set; }

    public string OriginY { get; set; }

    public System.Data.Entity.Spatial.DbGeometry Shape { get; set; }

    public System.DateTime UpdateDate { get; set; }

    public System.DateTime CreateDate { get; set; }

}

}
