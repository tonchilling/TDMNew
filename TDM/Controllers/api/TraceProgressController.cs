using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using TDM.Models;
using Newtonsoft.Json;
using System.Data;
using System.Text;

namespace TDM.Controllers.api
{
    public class TraceProgressController : ApiController
    {
        #region ==== Function 5 ====
        TDTRACKINGEntities db = new TDTRACKINGEntities();

        public IHttpActionResult GetUMSystem()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetUMSystem());
        }

        public IHttpActionResult GetLoginHistory()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.LOGIN_HISTORY());
        }

        public IHttpActionResult GetProvice()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetProvice());
        }

        public IHttpActionResult GetDistrictByProvince(string ProvinceNo)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetDistrictByProvince(ProvinceNo));
        }

        public IHttpActionResult GetTambonByProvinceDitinct(string Dis4code)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetTambonByProvinceDitinct(Dis4code));
        }

        public IHttpActionResult GetTraceProgressByRegion(string Username, string YearCode, string DocumentType)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetTraceProgressByRegion(Username, YearCode, DocumentType));
        }

        public IHttpActionResult GetTraceProgressByProvince(string Username, string YearCode, string DocumentType, string RegionId)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetTraceProgressByProvince(Username, YearCode, DocumentType, RegionId));
        }

        public IHttpActionResult GetTraceProgressByDistrict(string Username, string YearCode, string DocumentType, string Province)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetTraceProgressByDistrict(Username, YearCode, DocumentType, Province));
        }

        public IHttpActionResult GetTraceProgressByTambon(string Username, string YearCode, string DocumentType, string Province, string District)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetTraceProgressByTambon(Username, YearCode, DocumentType, Province, District));
        }

        #region == Map == 
        //GetShapeByAppraise
        public IHttpActionResult GetShapeByAppraise(string Appraiser, string ProvinceCode)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetShapeByAppraise(Appraiser, ProvinceCode));
        }
        #endregion

        #region == Chart ==

        public IHttpActionResult GetProvinceReportSummaryByDocumentType(string Username, string YearCode, string DocumentType, string Province)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetProvinceReportSummaryByDocumentType(Username, YearCode, DocumentType, Province));
        }
        #endregion
        #endregion

        #region ==== Function 6 ====
        public IHttpActionResult GetAppraiseMemberDistrict(string District, string Province)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetAppraiseMemberDistrict(District, Province));
        }
        public IHttpActionResult GetAppraiseMemberProvince(string Province)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetAppraiseMemberProvince(Province));
        }

        public IHttpActionResult GetLoginHistory(string datestart, string dateend, string timestart, string timeend, string sysid,string hour)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetLoginHistory(datestart, dateend, timestart, timeend, sysid, hour));
        }

        public string GetRegionShapeBy(string code)
        {
            db.Configuration.ProxyCreationEnabled = false;
            DataSet ds = new DataSet();
            ds = db.GetRegionShapeBy(code);
            string result = "";
            if (ds.Tables.Count > 0)
                result = DataTableToJSONWithStringBuilder(ds.Tables[0]);
            return result;
        }

        //HD
        public string GetTransactionPlanHdById(string Id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            DataSet ds = new DataSet();
            ds = db.GetTransactionPlanHdById(Id);
            string result = "";
            if (ds.Tables.Count > 0)
                result = DataTableToJSONWithStringBuilder(ds.Tables[0]);
            return result;
        }

        public IHttpActionResult GetTransactionPlanHdByCode(string Code)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetTransactionPlanHdByCode(Code));
        }

        public string GetTransactionPlanHdByCode_TOP1(string Code)
        {
            db.Configuration.ProxyCreationEnabled = false;
            DataSet ds = new DataSet();
            ds = db.GetTransactionPlanHdByCode_TOP1(Code);
            string result = "";
            if (ds.Tables.Count > 0)
                result = DataTableToJSONWithStringBuilder(ds.Tables[0]);
            return result;
        }

        public string GetTransactionPlanHdByCodeAndProvince(string Code,string Province)
        {
            db.Configuration.ProxyCreationEnabled = false;
            DataSet ds = new DataSet();
            ds = db.GetTransactionPlanHdByCodeAndProvince(Code, Province);
            string result = "";
            if (ds.Tables.Count > 0)
                result = DataTableToJSONWithStringBuilder(ds.Tables[0]);
            return result;
        }

        //DT
        public string GetTransactionPlanDtByTransactionPlanHdId(string TransactionPlanHdId)
        {
            db.Configuration.ProxyCreationEnabled = false;
            DataSet ds = new DataSet();
            ds = db.GetTransactionPlanDtByTransactionPlanHdId(TransactionPlanHdId);
            string result = "";
            if (ds.Tables.Count > 0)
                result = DataTableToJSONWithStringBuilder(ds.Tables[0]);
            return result;
        }

        public IHttpActionResult GetTransactionPlanDtByCodeAndProvince(string Code, string Province)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetTransactionPlanDtByCodeAndProvince(Code, Province));
        }

        private static string DataTableToJSONWithStringBuilder(DataTable table)
        {
            var JSONString = new StringBuilder();
            if (table.Rows.Count > 0)
            {
                JSONString.Append("[");
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JSONString.Append("{");
                    for (int j = 0; j < table.Columns.Count; j++)
                    {
                        if (j < table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\",");
                        }
                        else if (j == table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\"");
                        }
                    }
                    if (i == table.Rows.Count - 1)
                    {
                        JSONString.Append("}");
                    }
                    else
                    {
                        JSONString.Append("},");
                    }
                }
                JSONString.Append("]");
            }
            return JSONString.ToString();
        }
        #endregion

        #region ==== Map ====
        public string GetSHPByPoint(string Point_47, string Point_48)
        {
            db.Configuration.ProxyCreationEnabled = false;
            DataSet ds = new DataSet();
            ds = db.GetSHPByPoint(Point_47, Point_48);
            string result = "";
            if (ds.Tables.Count > 0)
                result = DataTableToJSONWithStringBuilder(ds.Tables[0]);
            return result;
        }

        public IHttpActionResult GetSHAPETransactionPlanHdByCode(string Code)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.GetSHAPETransactionPlanHdByCode(Code));
        }
        #endregion
    }
}