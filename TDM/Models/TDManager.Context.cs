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

}

}

