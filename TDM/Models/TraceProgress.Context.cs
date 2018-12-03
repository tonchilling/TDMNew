﻿//------------------------------------------------------------------------------
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
    using System.Data;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    using System.Configuration;
    using System.Data.SqlClient;

    public partial class TDTRACKINGEntities : DbContext
    {
        public TDTRACKINGEntities()
            : base("name=TDTRACKINGEntities")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }


        #region Stored Procedures
        string cs = ConfigurationManager.ConnectionStrings["TDTRACKINGEntities"].ConnectionString;
        public DataTable GetProvice()
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_TDASSET_GetProvice", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Clear();
                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable GetDistrictByProvince(string ProvinceNo)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_TDASSET_GetDistrictByProvince", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("ProvinceNo", SqlDbType.VarChar));
                cmd.Parameters["ProvinceNo"].Value = String.IsNullOrEmpty(ProvinceNo) ? (object)DBNull.Value : ProvinceNo;

                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable GetTambonByProvinceDitinct(string Dis4code)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_TDASSET_GetTambonByProvinceDitinct", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("DIS4CODE", SqlDbType.VarChar));
                cmd.Parameters["DIS4CODE"].Value = String.IsNullOrEmpty(Dis4code) ? (object)DBNull.Value : Dis4code;

                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable GetTraceProgressByRegion(string Username, string YearCode, string DocumentType)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_PTS_RPRegionReportSummaryByUser", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("Username", SqlDbType.VarChar));
                cmd.Parameters["Username"].Value = String.IsNullOrEmpty(Username) ? (object)DBNull.Value : Username;

                cmd.Parameters.Add(new SqlParameter("YearCode", SqlDbType.VarChar));
                cmd.Parameters["YearCode"].Value = String.IsNullOrEmpty(YearCode) ? (object)DBNull.Value : YearCode;

                cmd.Parameters.Add(new SqlParameter("DocumentType", SqlDbType.VarChar));
                cmd.Parameters["DocumentType"].Value = String.IsNullOrEmpty(DocumentType) ? (object)DBNull.Value : DocumentType;

                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable GetUMSystem()
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_TDASSET_GetUMSystem", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable LOGIN_HISTORY()
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_TDASSET_LOGIN_HISTORY", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable GetTraceProgressByProvince(string Username, string YearCode, string DocumentType, string RegionId)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                //SqlCommand cmd = new SqlCommand("sp_TDTRACKING_GetTraceProgressByProvince", con);
                SqlCommand cmd = new SqlCommand("sp_PTS_RPProvinceReportSummaryByUserAndRegion", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("Username", SqlDbType.VarChar));
                cmd.Parameters["Username"].Value = String.IsNullOrEmpty(Username) ? (object)DBNull.Value : Username;

                cmd.Parameters.Add(new SqlParameter("YearCode", SqlDbType.VarChar));
                cmd.Parameters["YearCode"].Value = String.IsNullOrEmpty(YearCode) ? (object)DBNull.Value : YearCode;

                cmd.Parameters.Add(new SqlParameter("DocumentType", SqlDbType.VarChar));
                cmd.Parameters["DocumentType"].Value = String.IsNullOrEmpty(DocumentType) ? (object)DBNull.Value : DocumentType;

                cmd.Parameters.Add(new SqlParameter("RegionId", SqlDbType.VarChar));
                cmd.Parameters["RegionId"].Value = String.IsNullOrEmpty(RegionId) ? (object)DBNull.Value : RegionId;

                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable GetTraceProgressByDistrict(string Username, string YearCode, string DocumentType, string Province)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                //SqlCommand cmd = new SqlCommand("sp_TDTRACKING_GetTraceProgressByProvince", con);
                SqlCommand cmd = new SqlCommand("sp_PTS_RPDistrictReportSummaryByUserAndProvince", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("Username", SqlDbType.VarChar));
                cmd.Parameters["Username"].Value = String.IsNullOrEmpty(Username) ? (object)DBNull.Value : Username;

                cmd.Parameters.Add(new SqlParameter("YearCode", SqlDbType.VarChar));
                cmd.Parameters["YearCode"].Value = String.IsNullOrEmpty(YearCode) ? (object)DBNull.Value : YearCode;

                cmd.Parameters.Add(new SqlParameter("DocumentType", SqlDbType.VarChar));
                cmd.Parameters["DocumentType"].Value = String.IsNullOrEmpty(DocumentType) ? (object)DBNull.Value : DocumentType;

                cmd.Parameters.Add(new SqlParameter("Province", SqlDbType.VarChar));
                cmd.Parameters["Province"].Value = String.IsNullOrEmpty(Province) ? (object)DBNull.Value : Province;



                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable GetTraceProgressByTambon(string Username, string YearCode, string DocumentType, string Province, string District)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                District = (District.Length == 1) ? District.PadLeft(2, '0') : District;

                SqlCommand cmd = new SqlCommand("sp_PTS_RPTambonReportSummaryByUserAndDistrict", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("Username", SqlDbType.VarChar));
                cmd.Parameters["Username"].Value = String.IsNullOrEmpty(Username) ? (object)DBNull.Value : Username;

                cmd.Parameters.Add(new SqlParameter("YearCode", SqlDbType.VarChar));
                cmd.Parameters["YearCode"].Value = String.IsNullOrEmpty(YearCode) ? (object)DBNull.Value : YearCode;

                cmd.Parameters.Add(new SqlParameter("DocumentType", SqlDbType.VarChar));
                cmd.Parameters["DocumentType"].Value = String.IsNullOrEmpty(DocumentType) ? (object)DBNull.Value : DocumentType;

                cmd.Parameters.Add(new SqlParameter("Province", SqlDbType.VarChar));
                cmd.Parameters["Province"].Value = String.IsNullOrEmpty(Province) ? (object)DBNull.Value : Province;

                cmd.Parameters.Add(new SqlParameter("District", SqlDbType.VarChar));
                cmd.Parameters["District"].Value = String.IsNullOrEmpty(District) ? (object)DBNull.Value : District;


                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }



        public DataTable GetShapeByAppraise(string Appraiser, string ProvinceCode)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_PTS_GetShapeByAppraise", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("Appraiser", SqlDbType.VarChar));
                cmd.Parameters["Appraiser"].Value = String.IsNullOrEmpty(Appraiser) ? (object)DBNull.Value : Appraiser;

                cmd.Parameters.Add(new SqlParameter("ProvinceCode", SqlDbType.VarChar));
                cmd.Parameters["ProvinceCode"].Value = String.IsNullOrEmpty(ProvinceCode) ? (object)DBNull.Value : ProvinceCode;

                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }



        public DataTable GetAppraiseMemberDistrict(string District, string Province)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_PTS_GetAppraiseMemberDistrict", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("District", SqlDbType.VarChar));
                cmd.Parameters["District"].Value = String.IsNullOrEmpty(District) ? (object)DBNull.Value : District;

                cmd.Parameters.Add(new SqlParameter("Province", SqlDbType.VarChar));
                cmd.Parameters["Province"].Value = String.IsNullOrEmpty(Province) ? (object)DBNull.Value : Province;

                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataTable GetAppraiseMemberProvince(string Province)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_PTS_GetAppraiseMemberProvince", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();

                cmd.Parameters.Add(new SqlParameter("Province", SqlDbType.VarChar));
                cmd.Parameters["Province"].Value = String.IsNullOrEmpty(Province) ? (object)DBNull.Value : Province;

                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }


        public DataTable GetProvinceReportSummaryByDocumentType(string Username, string YearCode, string DocumentType, string Province)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_PTS_RPProvinceReportSummaryByDocumentType", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();
                cmd.Parameters.Add(new SqlParameter("Username", SqlDbType.VarChar));
                cmd.Parameters["Username"].Value = String.IsNullOrEmpty(Username) ? (object)DBNull.Value : Username;

                cmd.Parameters.Add(new SqlParameter("YearCode", SqlDbType.VarChar));
                cmd.Parameters["YearCode"].Value = String.IsNullOrEmpty(YearCode) ? (object)DBNull.Value : YearCode;

                cmd.Parameters.Add(new SqlParameter("DocumentType", SqlDbType.VarChar));
                cmd.Parameters["DocumentType"].Value = String.IsNullOrEmpty(DocumentType) ? (object)DBNull.Value : DocumentType;

                cmd.Parameters.Add(new SqlParameter("Province", SqlDbType.VarChar));
                cmd.Parameters["Province"].Value = String.IsNullOrEmpty(Province) ? (object)DBNull.Value : Province;


                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds.Tables[0];
        }

        public DataSet GetLoginHistory(string datestart, string dateend, string timestart, string timeend, string sysid,string hour)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_TDTRACKING_GetLoginHistory", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();

                cmd.Parameters.Add(new SqlParameter("DateStart", SqlDbType.VarChar));
                cmd.Parameters["DateStart"].Value = String.IsNullOrEmpty(datestart) ? (object)DBNull.Value : datestart;

                cmd.Parameters.Add(new SqlParameter("DateEnd", SqlDbType.VarChar));
                cmd.Parameters["DateEnd"].Value = String.IsNullOrEmpty(dateend) ? (object)DBNull.Value : dateend;

                cmd.Parameters.Add(new SqlParameter("TimeStart", SqlDbType.VarChar));
                cmd.Parameters["TimeStart"].Value = String.IsNullOrEmpty(timestart) ? (object)DBNull.Value : timestart;

                cmd.Parameters.Add(new SqlParameter("TimeEnd", SqlDbType.VarChar));
                cmd.Parameters["TimeEnd"].Value = String.IsNullOrEmpty(timeend) ? (object)DBNull.Value : timeend;

                cmd.Parameters.Add(new SqlParameter("SYSId", SqlDbType.VarChar));
                cmd.Parameters["SYSId"].Value = String.IsNullOrEmpty(sysid) ? (object)DBNull.Value : sysid;

                cmd.Parameters.Add(new SqlParameter("Hour", SqlDbType.VarChar));
                cmd.Parameters["Hour"].Value = String.IsNullOrEmpty(hour) ? (object)DBNull.Value : hour;


                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds;
        }

        public DataSet GetRegionShapeBy(string code)
        {
            DataSet ds = new DataSet();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_TDASSET_GetRegionShapeBy", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Clear();

                cmd.Parameters.Add(new SqlParameter("Id", SqlDbType.VarChar));
                cmd.Parameters["Id"].Value = String.IsNullOrEmpty(code) ? (object)DBNull.Value : code;

                con.Open();
                var adapter = new SqlDataAdapter(cmd);

                adapter.Fill(ds);
            }
            return ds;
        }
        #endregion

    }
}
