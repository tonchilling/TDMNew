using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using TDM.Models.ViewModels;
using  Dapper;
using System.Configuration;
using System.Text.RegularExpressions;
namespace TDM.Repositories
{
    public class DBRepository
    {
        string dbConnectionStr = ConfigurationManager.AppSettings["dbConnection"].ToString();
        string BIServer = ConfigurationManager.AppSettings["BIServer"].ToString();
        public IDbConnection CreateConnectionManage()
        {
            var regex = new Regex("(data source)=\\w.*");
            var connectionString = regex.Match(ConfigurationManager.ConnectionStrings["TDManagementEntities"].ConnectionString).Value.TrimEnd(new char[] { '"' });
            return new SqlConnection(connectionString);
        }

        public List<Databases> GetDatabaseList(DBViewModel dto)
        {

            List<Databases> dbList = new List<Databases>();
            Databases db = null;
            List<TableAll> tableAll = new List<TableAll>();
            List<ColumnAll> columnAll = new List<ColumnAll>();
            // Open connection to the database
            string conString = string.Format("{0}", BIServer);

            using (SqlConnection con = new SqlConnection(conString))
            {
                con.Open();

                // Set up a command with the given query and associate
                // this with the current connection.
                using (SqlCommand cmd = new SqlCommand("GetAllDatabase", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (IDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            db = new Databases();
                            db.Database = dr[0].ToString();
                            dbList.Add(db);
                        }
                        dr.NextResult();
                        while (dr.Read())
                        {

                            tableAll.Add(new TableAll() { Database = dr[0].ToString(), Table = dr[1].ToString() + '.' + dr[2].ToString() });

                        }
                        dr.NextResult();
                        while (dr.Read())
                        {

                            columnAll.Add(new ColumnAll() { Database = dr[0].ToString(), Table = dr[1].ToString() + '.' + dr[2].ToString(), Column = dr[3].ToString() });

                        }
                    }
                }
                /* from q in pois
                 select
                 new
                 {
                     OBJECT_ID = q.OBJECTID,
                     NAME = q.NAME_T,
                     X = q.X,
                     Y = q.Y,
                     CHANGWAT_NAME = q.PROV_NAME_T,
                     TUMBON_NAME = q.TUMB_NAME_T,
                     AMPHUR_NAME = q.AMPH_NAME_T,
                     TUMBON_CODE = q.TUMB_CODE,
                 }
             );
               */
                foreach (Databases tempDB in dbList)
                {
                    tempDB.Tables = tableAll.FindAll(o => o.Database == tempDB.Database);
                    foreach (TableAll tempTable in tempDB.Tables)
                    {
                        tempTable.Columns = columnAll.FindAll(o => o.Database == tempTable.Database && o.Table == tempTable.Table);
                    }
                }
            }
            return dbList;

        }


        public List<Databases> GetDatabaseList_Old(DBViewModel dto)
        {
           
            List<Databases> dbList = new List<Databases>();
            Databases db = null;
            List<TableAll> tableAll = new List<TableAll>();
            List < ColumnAll> columnAll = new List<ColumnAll>();
            // Open connection to the database
            string conString = string.Format("server={0};uid={1};pwd={2}; database={3}", dto.Server, dto.User, dto.Password, dbConnectionStr);

            using (SqlConnection con = new SqlConnection(conString))
            {
                con.Open();

                // Set up a command with the given query and associate
                // this with the current connection.
                using (SqlCommand cmd = new SqlCommand("GetAllDatabase", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (IDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            db = new Databases();
                            db.Database = dr[0].ToString();
                            dbList.Add(db);
                        }
                        dr.NextResult();
                        while (dr.Read())
                        {

                            tableAll.Add(new TableAll() { Database=dr[0].ToString(),  Table= dr[1].ToString() +'.'+ dr[2].ToString() });
                          
                        }
                        dr.NextResult();
                        while (dr.Read())
                        {

                            columnAll.Add(new ColumnAll() { Database = dr[0].ToString(), Table = dr[1].ToString() + '.' + dr[2].ToString(), Column= dr[3].ToString() });
                           
                        }
                    }
                }
                /* from q in pois
                 select
                 new
                 {
                     OBJECT_ID = q.OBJECTID,
                     NAME = q.NAME_T,
                     X = q.X,
                     Y = q.Y,
                     CHANGWAT_NAME = q.PROV_NAME_T,
                     TUMBON_NAME = q.TUMB_NAME_T,
                     AMPHUR_NAME = q.AMPH_NAME_T,
                     TUMBON_CODE = q.TUMB_CODE,
                 }
             );
               */
                foreach (Databases tempDB in dbList)
                {
                    tempDB.Tables = tableAll.FindAll(o => o.Database == tempDB.Database);
                    foreach (TableAll tempTable in tempDB.Tables)
                    {
                        tempTable.Columns= columnAll.FindAll(o => o.Database == tempTable.Database && o.Table== tempTable.Table);
                    }
                }
            }
            return dbList;

        }


        public DataTable GetQueryToDatatable(DBViewModel dto)
        {
            List<string> list = new List<string>();
            var tb = new DataTable();
            // Open connection to the database
            string conString = string.Format("{0}", BIServer);
            try
            {

                if (dto.Query.ToLower().IndexOf("insert") > -1
                    || dto.Query.ToLower().IndexOf("update") > -1
                    || dto.Query.ToLower().IndexOf("delete") > -1)
                {
                    throw new Exception("Invalid Query cannot used insert update delete!!");
                }
                    using (SqlConnection con = new SqlConnection(conString))
                {
                    con.Open();

                    // Set up a command with the given query and associate
                    // this with the current connection.
                    using (SqlCommand cmd = new SqlCommand(dto.Query, con))
                    {



                        using (IDataReader dr = cmd.ExecuteReader())
                        {

                            tb.Load(dr);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Query Error:"+ ex.Message); 
            }
            return tb;

        }


        public DataTable GetQueryToDatatable_Old(DBViewModel dto)
        {
            List<string> list = new List<string>();
            var tb = new DataTable();
            // Open connection to the database
            string conString = string.Format("server={0};uid={1};pwd={2}; database=master", dto.Server, dto.User, dto.Password);

            using (SqlConnection con = new SqlConnection(conString))
            {
                con.Open();

                // Set up a command with the given query and associate
                // this with the current connection.
                using (SqlCommand cmd = new SqlCommand(dto.Query, con))
                {
                   
                  
                  
                     using (IDataReader dr = cmd.ExecuteReader())
                      {

                        tb.Load(dr);
                    }
                }
            }
            return tb;

        }


        public bool AddTemplate(ChartTemplate_ViewModel chartTemplate)
        {
            IDataReader reader = null;
            IDbTransaction tran = null;
            var input = 0;
            var templateID = "";
          
            var p = new DynamicParameters();
            p.Add("@TemplateID", chartTemplate.TemplateID,DbType.String,ParameterDirection.InputOutput,100); // Region=1, Cluster=2
            p.Add("@Name", chartTemplate.Name, dbType: DbType.String);    // Region=Code, Cluster=47 or 48

            try
            {

                using (IDbConnection conn = CreateConnectionManage())
                {
                    conn.Open();
                    tran = conn.BeginTransaction();

                    input = conn.Execute("sp_TemplateHeader_Insert", p, tran, null, commandType: CommandType.StoredProcedure);

                    templateID = p.Get<string>("@TemplateID");
                    foreach (Chart chart in chartTemplate.Charts)
                    {
                        p = new DynamicParameters();
                        p.Add("@TemplateID", templateID, DbType.String, ParameterDirection.Input, null); // Region=1, Cluster=2
                        p.Add("@No", chart.No, dbType: DbType.String);
                        p.Add("@GraphID", chart.GraphID, dbType: DbType.String);
                        p.Add("@Title", chart.Title, dbType: DbType.String);
                        p.Add("@Width", chart.Width, dbType: DbType.String);
                        p.Add("@Color", chart.Color, dbType: DbType.String);
                        p.Add("@x", chart.x, dbType: DbType.String);
                        p.Add("@y", chart.y, dbType: DbType.String);
                        p.Add("@Desc", chart.Desc, dbType: DbType.String);
                        p.Add("@Connection", chart.Connection, dbType: DbType.String);
                        p.Add("@Chart", chart.ChartOptions, dbType: DbType.String);
                        p.Add("@xAxisData", chart.xAxisData, dbType: DbType.String);
                        p.Add("@yAxisData", chart.yAxisData, dbType: DbType.String);
                        p.Add("@SortNo", chart.SortNo, dbType: DbType.String);

                        input = conn.Execute("sp_TemplateDetail_Insert", p, tran, null, commandType: CommandType.StoredProcedure);
                    }

                    tran.Commit();
                }
            }
            catch (Exception ex)
            {
                tran.Rollback();
                string error = ex.ToString();
            }
            finally {
               
            }

            return input==0;
        }

        public ChartTemplate_ViewModel GetGraphList(string templateID)
        {
            IDataReader reader = null;
            ChartTemplate_ViewModel result = null;
            List<Chart> chartList = null;
            Chart chart = null;
            var p = new DynamicParameters();
            p.Add("@TemplateID", templateID);
            // p.Add("@Code", search.Code, dbType: DbType.String);

            try
            {
                result = new ChartTemplate_ViewModel();
                using (IDbConnection conn = CreateConnectionManage())
                {

                    reader = conn.ExecuteReader(string.Format("sp_GetGraphList"), p, commandType: CommandType.StoredProcedure);

                    chartList = new List<Chart>();
                    if (reader.Read())
                    {
                        result.TemplateID= reader["TemplateID"].ToString();
                        result.Name= reader["Name"].ToString();
                      


                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        chart = new Chart();
                        chart.No = reader["No"].ToString();
                        chart.Title = reader["Title"].ToString();
                        chart.Width = reader["Width"].ToString();
                        chart.Color = reader["Color"].ToString();
                        chart.x= reader["x"].ToString();
                        chart.y = reader["y"].ToString();
                        chart.GraphID = reader["GraphID"].ToString();
                        chart.Desc= reader["Desc"].ToString();
                        chart.ChartOptions = reader["Chart"].ToString();
                        chart.Connection = reader["Connection"].ToString();
                        chart.xAxisData = reader["xAxisData"].ToString();
                        chart.yAxisData = reader["yAxisData"].ToString();
                        chart.SortNo = reader["SortNo"].ToString();
                        chartList.Add(chart);
                    }
                    result.Charts = chartList;
                }
            }
            catch (Exception ex)
            { }

            return result;
        }


        public List<ChartTemplate_ViewModel> LoadAllList(string templateID)
        {
            IDataReader reader = null;
            ChartTemplate_ViewModel result = null;
            List<ChartTemplate_ViewModel> chartTempateList = null;
            Chart chart = null;
            var p = new DynamicParameters();
            p.Add("@TemplateID", templateID);
            // p.Add("@Code", search.Code, dbType: DbType.String);

            try
            {
                result = new ChartTemplate_ViewModel();
                using (IDbConnection conn = CreateConnectionManage())
                {


                    reader = conn.ExecuteReader(string.Format("sp_GetGraphList"), p, commandType: CommandType.StoredProcedure);

                    chartTempateList = new List<ChartTemplate_ViewModel>();
                    while (reader.Read())
                    {
                        result = new ChartTemplate_ViewModel();
                        result.TemplateID = reader["TemplateID"].ToString();
                        result.Name = reader["Name"].ToString();
                        result.CreateDate = reader["CreateDate"].ToString();
                        chartTempateList.Add(result);

                    }
                  
                }
            }
            catch (Exception ex)
            { }

            return chartTempateList;
        }

        
    }
}