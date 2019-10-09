using AutoMapper;
using DotSpatial.Data;
using DotSpatial.Projections;
using Microsoft.SqlServer.Types;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TDM.Models;
using TDM.Repositories;
using TDM.Models.Utils;
namespace TDM.Controllers.api
{
    public class AreaAnalysisController : ApiController
    {
        private JsonSerializerSettings jsonSetting = JsonHelper.createJsonSetting();
        private TDManagementEntities tdmEntities = null;
        private TDASSETEntities tdaEntities = null;
       
        int overMax = 10;
        protected AreaAnalysisController()
        {
            tdmEntities = new TDManagementEntities();
            tdaEntities = new TDASSETEntities();
            tdmEntities.Configuration.ProxyCreationEnabled = false;
            tdaEntities.Configuration.ProxyCreationEnabled = false;
        }

        //[HttpPost]
        //public IHttpActionResult AddProvImpact(AddProvImpactPARAMS prms)
        //{
        //    try
        //    {
        //        int project_id = prms.projectId;
        //        string[] prov_codes = prms.provCodes;

        //        var add_list = prov_codes.Select(x => new PROV_IMPACT() {
        //            ID = 0,
        //            PROJECT_ID = project_id,
        //            PROV_CODE = x
        //        }).ToList();

        //        var added_list = tdmEntities.PROV_IMPACT.AddRange(add_list);
        //        tdmEntities.SaveChanges();
        //        return Json(added_list, jsonSetting);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(ex);
        //    }
        //}
        //public class AddProvImpactPARAMS {
        //    public int projectId { get; set; }
        //    public string[] provCodes { get; set; }
        //}

        //[HttpPost]
        //public IHttpActionResult DelProvImpact(DelProvImpactPARAMS prms)
        //{
        //    try
        //    {
        //        int[] ids = prms.ids;
        //        var founds = tdmEntities.PROV_IMPACT.Where(x => ids.Any(y=>y==x.ID));
        //        var removes = tdmEntities.PROV_IMPACT.RemoveRange(founds);

        //        tdmEntities.SaveChanges();
        //        return Json(removes, jsonSetting);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(ex);
        //    }
        //}
        //public class DelProvImpactPARAMS
        //{
        //    public int[] ids { get; set; }
        //}




        [HttpPost]
        public IHttpActionResult UpdateProject(PROJECT_IMPACT project)
        {
            try
            {
                var repos = new TDAssetRespository();

                PROJECT_IMPACT updateProject = tdmEntities.PROJECT_IMPACT.First(x => x.ID == project.ID);

                updateProject.IS_DELETED = project.IS_DELETED;
                updateProject.SUBJECT_ID = project.SUBJECT_ID;
                updateProject.SUBJECT_NAME = project.SUBJECT_NAME;
                updateProject.PUBLISH_DATE = project.PUBLISH_DATE;
                updateProject.IS_PUBLISHED = project.IS_PUBLISHED;
                updateProject.UPDATE_BY = project.UPDATE_BY;
                updateProject.UPDATE_DATE = project.UPDATE_DATE;
                updateProject.CREATE_DATE = project.CREATE_DATE;
                updateProject.CREATE_BY = project.CREATE_BY;
                updateProject.PROVINCE_ID = project.PROVINCE_ID;
                updateProject.AMPHOE_ID = project.AMPHOE_ID;
                updateProject.TAMBOL_ID = project.TAMBOL_ID;
                updateProject.Shape = project.Shape!=null ? project.Shape:null;
                tdmEntities.SaveChanges();

                repos.AddPROJECT_IMPACT_GEOMETRY(updateProject);

                return Json(project, jsonSetting);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult AddProject(PROJECT_IMPACT project)
        {
            var repos = new TDAssetRespository(); 
            try
            {
                project.ID = 0;
                PROJECT_IMPACT saveProject = tdmEntities.PROJECT_IMPACT.Add(project);
                tdmEntities.SaveChanges();

                repos.AddPROJECT_IMPACT_GEOMETRY(saveProject);

                return Json(saveProject, jsonSetting);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        

        [HttpPost]
        public IHttpActionResult DeleteProject(DelProjectImpact project)
        {
            try
            {
                PROJECT_IMPACT deleteProject = tdmEntities.PROJECT_IMPACT.First(x => x.ID == project.ID);
                deleteProject.ID = project.ID;
                deleteProject.IS_DELETED = project.IS_DELETED;


                tdmEntities.PROJECT_IMPACT.Remove(deleteProject);

                var targetDelete = tdmEntities.PROJECT_IMPACT_GEOMETRY.Where(p => p.ProjectImpactID == project.ID);
                tdmEntities.PROJECT_IMPACT_GEOMETRY.RemoveRange(targetDelete);



                tdmEntities.SaveChanges();
                return Json(project, jsonSetting);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public class DelProjectImpact
        {
            public int ID { get; set; }
            public bool IS_DELETED { get; set; }
        }

        [HttpGet]
        public IHttpActionResult GetProjectArea(string subject_id)
        {
            try
            {
                List<PROJECT_AREA_ViewModel> projectArea = tdaEntities.PROJECT_AREA_47.Where(x => x.SUBJECT_ID.Equals(subject_id)).Select(x => Mapper.Map<PROJECT_AREA_ViewModel>(x)).ToList();
                projectArea.AddRange(tdaEntities.PROJECT_AREA_48.Where(x => x.SUBJECT_ID.Equals(subject_id)).Select(x => Mapper.Map<PROJECT_AREA_ViewModel>(x)).ToList());

                return Json(projectArea.Select(x => new
                {
                    x.OBJECTID,
                    x.SUBJECT_ID,
                    x.PROV_CODE,
                    x.STATUS_PROCESS,
                    SHAPE = x.SHAPE.ToString()
                }).ToList());
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllProvince()
        {
            try
            {
                return Json(tdaEntities.PROVINCEs.Select(x => new
                {
                    CODE = x.PRO_C,
                    NAME = x.ON_PRO_THA
                }).ToList());
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        /// <summary>
        /// For Section 1
        /// </summary>
        /// <param name="searchDto"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetSection1EstimateList(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();
            var estimateData = repos.GetSection1EstimateList(searchDto);

            return Json(estimateData);
        }


        /// <summary>
        /// For Section 4 
        /// </summary>
        /// <param name="searchDto"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult GetAllProjectImpactBI(SearchMap searchDto)
        {
            var repos = new TDAssetRespository();

            GetProjectImpacteBI resultList = new GetProjectImpacteBI();
            List<string> data = null;
            List<BarchartValue> value = null;
            List<BarchartValue> value2 = null;
            BarchartValue barValue = null;
            var barchart = new Barchart();
            int row = 0;

            if (searchDto.SectionType == SetionType.Region)
            {
                searchDto.RegionCode = searchDto.Code;
            }
            else if (searchDto.SectionType == SetionType.Provice)
            {
                searchDto.ProvinceCode = searchDto.Code;
            }
                var estimateData = repos.GetPROJECT_IMPACT(searchDto);

            if (estimateData != null)
            {
                resultList.EstimateData = estimateData.OrderByDescending(o => o.ParcelTotal).ToList();

                data = new List<string>();
                value = new List<BarchartValue>();
                value2 = new List<BarchartValue>();

                foreach (PROJECT_IMPACTDto result in estimateData.OrderByDescending(o => o.ParcelTotal))
                {

                    if (row >= overMax)
                    {
                        break;
                    }


                    barValue = new BarchartValue();
                    barValue.name = result.SUBJECT_NAME;
                    barValue.value = Converting.ToDecimal(result.ParcelTotal);
                    barValue.key = result.SUBJECT_ID;


                    value.Add(barValue);


                    barValue = new BarchartValue();
                    barValue.name = result.SUBJECT_NAME;
                    barValue.value = Converting.ToDecimal(result.Area);
                    barValue.key = result.SUBJECT_ID;
                    value2.Add(barValue);



                    data.Add(result.SUBJECT_NAME);

                    row++;

                }

                barchart.Data = data;
                barchart.Value = value;
                barchart.Value2 = value2;
            }

            resultList.Barchart = barchart;


            return Json(resultList);
        }

        [HttpPost]
        public IHttpActionResult GetAllProjectImpact(PROJECT_IMPACTDto searchDto)
        {
            var repos = new TDAssetRespository();
            var estimateData = repos.GetPROJECT_IMPACT(searchDto);

            return Json(estimateData);
        }



        [HttpGet]
        public IHttpActionResult GetAllProjectImpact(int start, int count, string subject_id = "", string subject_name = "", string prov_name = "", DateTime? publish_date = null)
        {
            try
            {
                subject_id = subject_id == null ? "" : subject_id;
                subject_name = subject_name == null ? "" : subject_name;
                prov_name = prov_name == null ? "" : prov_name;
                subject_id = subject_id == null ? "" : subject_id;

                

                var PROVINCES = tdaEntities.PROVINCEs.Where(p => p.NAME_T.Contains(prov_name));

                var _projects = tdmEntities.PROJECT_IMPACT.Where(x => !x.IS_DELETED).ToList();
                var projects = _projects.Where(x =>
                    (subject_id == null || x.SUBJECT_ID.Contains(subject_id))
                    && (subject_name == null || x.SUBJECT_NAME.Contains(subject_name))
                    && (prov_name == null || prov_name.Length == 0 || (PROVINCES.Count() > 0 
                    && (
                          x.PROVINCE_ID==PROVINCES.FirstOrDefault().PRO_C 
                        /* tdaEntities.PROJECT_AREA_47.Any(y => y.SUBJECT_ID.Equals(x.SUBJECT_ID) && PROVINCES.Any(z => z.PRO_C.Equals(y.PROV_CODE)))
                         || tdaEntities.PROJECT_AREA_48.Any(y => y.SUBJECT_ID.Equals(x.SUBJECT_ID) && PROVINCES.Any(z => z.PRO_C.Equals(y.PROV_CODE))))*/
                        )
                        ))
                    && (publish_date == null || (x.PUBLISH_DATE.HasValue && x.PUBLISH_DATE.Value.Date == publish_date.Value.Date))
                    ).ToList().Select(x => Mapper.Map<PROJECT_IMPACT_ViewModel>(x)).ToList();

                List<dynamic> result = new List<dynamic>();
                /* foreach (var c in projects)
                 {
                     List<PROJECT_AREA_ViewModel> projectArea = tdaEntities.PROJECT_AREA_47.Where(x => x.SUBJECT_ID.Equals(c.SUBJECT_ID)).ToList().Select(x => Mapper.Map<PROJECT_AREA_ViewModel>(x)).ToList();
                     projectArea.AddRange(tdaEntities.PROJECT_AREA_48.Where(x => x.SUBJECT_ID.Equals(c.SUBJECT_ID)).ToList().Select(x => Mapper.Map<PROJECT_AREA_ViewModel>(x)).ToList());
                     c.PROVINCE = projectArea.GroupBy(x => x.PROV_CODE).Select(x => Mapper.Map<PROVINCE_ViewModel>(tdaEntities.PROVINCEs.Where(y => y.PRO_C.Equals(x.Key)).First())).ToList();
                     int statusId = projectArea.Count() == 0 ? 1 : (projectArea.Any(x => x.STATUS_PROCESS.Equals("N")) ? 2 : 3);
                     dynamic project = new
                     {
                         c.ID,
                         c.SUBJECT_ID,
                         c.SUBJECT_NAME,
                         c.PUBLISH_DATE,
                         c.CREATE_DATE,
                         c.CREATE_BY,
                         c.UPDATE_DATE,
                         c.UPDATE_BY,
                         c.PROVINCE,
                         c.IS_PUBLISHED,
                         STATUS = tdmEntities.STATUS_IMPACT.Where(y => y.ID == statusId).First()
                     };
                     result.Add(project);
                 }*/

                foreach (var c in projects)
                {
                    
                    c.PROVINCE = tdaEntities.PROVINCEs.Where(p => p.PRO_C == c.PROVINCE_ID).Select(r => new PROVINCE_ViewModel()
                    {
                        PRO_C = r.PRO_C,
                        NAME_T = r.NAME_T

                    }).ToList();

                    var projectImpactLists = tdmEntities.PROJECT_IMPACT_GEOMETRY.Where(p => p.ProjectImpactID == c.ID).ToList();

                    dynamic project = new
                    {
                        c.ID,
                        c.SUBJECT_ID,
                        c.SUBJECT_NAME,
                        c.PUBLISH_DATE,
                        c.CREATE_DATE,
                        c.CREATE_BY,
                        c.UPDATE_DATE,
                        c.UPDATE_BY,
                       c.PROVINCE,
                       
                        c.IS_PUBLISHED,
                        STATUS = tdmEntities.STATUS_IMPACT.Where(y => y.ID == (c.Shape!=null?2:1)).First(),
                        SHAPETOOLTYPE= (c.Shape!=null && c.Shape!="" && c.Shape.IndexOf('(')>0)?c.Shape.Substring(0,c.Shape.IndexOf('(')-1):"",
                        //ACTIVE=!c.IS_DELETED,
                        ACTIVE = !c.IS_PUBLISHED,
                        TotalImpactCount = projectImpactLists.Count(),
                        TotalImpactArea = projectImpactLists.Sum(p=>p.Area)
                    };
                    result.Add(project);
                }

                    result = result.Skip(start).Take(count).ToList();
                return Json(result, jsonSetting);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public class GetAllProjectImpactPrms
        {
            public int start { get; set; }
            public int count { get; set; }
            public string subject_id { get; set; }
            public string subject_name { get; set; }
            public string prov_name { get; set; }
            public DateTime publish_date { get; set; }
        }

        [HttpGet]
        public IHttpActionResult SumAllProjectImpact(int start, int count, string prov_code = "", string amphur_code = "", string branch_code = "", string subject_name = "")
        {
            try
            {
                var _projects = tdmEntities.PROJECT_IMPACT.Where(x => !x.IS_DELETED && x.IS_PUBLISHED).ToList();
                var projects = _projects.Where(x =>
                    (subject_name == null || x.SUBJECT_NAME.Contains(subject_name))
                    && (prov_code == null || prov_code.Length == 0 || ((
                        tdaEntities.PROJECT_AREA_47.Any(y => y.SUBJECT_ID.Equals(x.SUBJECT_ID) && y.PROV_CODE.Equals(prov_code))
                        || tdaEntities.PROJECT_AREA_48.Any(y => y.SUBJECT_ID.Equals(x.SUBJECT_ID) && y.PROV_CODE.Equals(prov_code)))))
                    ).ToList().Select(x => Mapper.Map<PROJECT_IMPACT_ViewModel>(x)).ToList();

                List<dynamic> result = new List<dynamic>();
                foreach (var c in projects)
                {

                    List<PROJECT_AREA_ViewModel> projectArea = tdaEntities.PROJECT_AREA_47.Where(x => x.SUBJECT_ID.Equals(c.SUBJECT_ID)).ToList().Select(x => Mapper.Map<PROJECT_AREA_ViewModel>(x)).ToList();
                    projectArea.AddRange(tdaEntities.PROJECT_AREA_48.Where(x => x.SUBJECT_ID.Equals(c.SUBJECT_ID)).ToList().Select(x => Mapper.Map<PROJECT_AREA_ViewModel>(x)).ToList());
                    c.PROVINCE = projectArea.GroupBy(x => x.PROV_CODE).Select(x => Mapper.Map<PROVINCE_ViewModel>(tdaEntities.PROVINCEs.Where(y => y.PRO_C.Equals(x.Key)).First())).ToList();
                    int statusId = projectArea.Count() == 0 ? 1 : (projectArea.Any(x => x.STATUS_PROCESS.Equals("N")) ? 2 : 3);
                    var PROJECT_AREA = projectArea.Select(x => new
                    {
                        x.OBJECTID,
                        x.SUBJECT_ID,
                        x.PROV_CODE,
                        x.STATUS_PROCESS,
                        SHAPE = x.SHAPE.ToString()
                    }).ToList();

                    DbGeometry PROJECT_AREA_SHAPE = null;
                    if (projectArea.Count() > 0) PROJECT_AREA_SHAPE = projectArea.ElementAt(0).SHAPE;
                    for (var i = 1; i < projectArea.Count(); i++)
                    {
                        var temp = PROJECT_AREA_SHAPE.Union(projectArea.ElementAt(i).SHAPE);
                        if (temp != null)
                        {
                            PROJECT_AREA_SHAPE = temp;
                        }
                    }

                    if (statusId == 3)
                    {
                        //////////////////////////////////
                        if (amphur_code != null && amphur_code.Length == 0)
                        {
                            amphur_code = null;
                        }

                        if (branch_code != null && branch_code.Length == 0)
                        {
                            branch_code = null;
                        }

                        List<PROJECT_PARCEL_47> projectParcel47 = tdaEntities.PROJECT_PARCEL_47.Where(x => x.SUBJECT_ID.Equals(c.SUBJECT_ID) && (amphur_code == null || x.AMPHUR_CODE.Equals(amphur_code)) && (branch_code == null || x.BRANCH_CODE.Equals(branch_code))).ToList();
                        List<PROJECT_PARCEL_48> projectParcel48 = tdaEntities.PROJECT_PARCEL_48.Where(x => x.SUBJECT_ID.Equals(c.SUBJECT_ID) && (amphur_code == null || x.AMPHUR_CODE.Equals(amphur_code)) && (branch_code == null || x.BRANCH_CODE.Equals(branch_code))).ToList();

                        List<PARCEL_ViewModel> resultParcel = new List<PARCEL_ViewModel>();

                        if (projectParcel47.Count() == 0 && projectParcel48.Count() == 0)
                        {
                            //continue;
                        }

                        foreach (var projectParcel in projectParcel47)
                        {
                            var bufferQuery = $@"SELECT 
                            [OBJECTID],[OGR_FID],[PARCEL_TYPE],[UTMMAP1],[UTMMAP2],[UTMMAP3],[UTMMAP4],[UTMSCALE],[LAND_NO],[LAND_TH],[LAND_NAME],[ACTION_STATUS],[LAND_AREA],[BRANCH_CODE],[BRANCH_NAME],[CHANGWAT_CODE],[CHANGWAT_NAME],[AMPHUR_CODE],[AMPHUR_NAME],[TUMBON_CODE],[TUMBON_NAME],[CHANOD_NO],[SURVEY_NO],[TABLE_3_SEQ],[ACCOUNTING_PERIOD],[PARCEL_SHAPE],[PARCEL_RN],[STREET_RN],[BLOCK_ZONE_RN],[BLOCK_PRICE_RN],[BLOCK_FIX_RN],[BLOCK_BLUE_RN],[PREV_EVAPRICE],[CURR_EVAPRICE],[DATE_CREATED],[USER_CREATED],[DATE_UPDATED],[USER_UPDATED],[SHAPE],[GDB_GEOMATTR_DATA],[EDIT_FLAG]
                            FROM [TDASSET].[tdadmin].[PARCEL_47_{projectParcel.CHANGWAT_CODE}]
                            WHERE [BRANCH_CODE]='{projectParcel.BRANCH_CODE}' AND [PARCEL_RN]={projectParcel.PARCEL_RN} ";
                            //if (amphur_code != null && amphur_code.Length > 0)
                            //bufferQuery = $@"{bufferQuery} AND [AMPHUR_CODE] = '{amphur_code}'";
                            bufferQuery = $@"IF (EXISTS (SELECT * 
                             FROM INFORMATION_SCHEMA.TABLES 
                             WHERE TABLE_SCHEMA = 'tdadmin' 
                             AND TABLE_NAME = 'PARCEL_47_{projectParcel.CHANGWAT_CODE}'))
                             BEGIN
                              {bufferQuery}
                             END";
                            resultParcel.AddRange(tdaEntities.Database.SqlQuery<PARCEL_ViewModel>(bufferQuery).ToList());
                        }
                        foreach (var projectParcel in projectParcel48)
                        {
                            var bufferQuery = $@"SELECT 
                            [OBJECTID],[OGR_FID],[PARCEL_TYPE],[UTMMAP1],[UTMMAP2],[UTMMAP3],[UTMMAP4],[UTMSCALE],[LAND_NO],[LAND_TH],[LAND_NAME],[ACTION_STATUS],[LAND_AREA],[BRANCH_CODE],[BRANCH_NAME],[CHANGWAT_CODE],[CHANGWAT_NAME],[AMPHUR_CODE],[AMPHUR_NAME],[TUMBON_CODE],[TUMBON_NAME],[CHANOD_NO],[SURVEY_NO],[TABLE_3_SEQ],[ACCOUNTING_PERIOD],[PARCEL_SHAPE],[PARCEL_RN],[STREET_RN],[BLOCK_ZONE_RN],[BLOCK_PRICE_RN],[BLOCK_FIX_RN],[BLOCK_BLUE_RN],[PREV_EVAPRICE],[CURR_EVAPRICE],[DATE_CREATED],[USER_CREATED],[DATE_UPDATED],[USER_UPDATED],[SHAPE],[GDB_GEOMATTR_DATA],[EDIT_FLAG]
                            FROM [TDASSET].[tdadmin].[PARCEL_48_{projectParcel.CHANGWAT_CODE}]
                            WHERE [BRANCH_CODE]={projectParcel.BRANCH_CODE} AND [PARCEL_RN]={projectParcel.PARCEL_RN}";
                            //if (amphur_code != null && amphur_code.Length > 0)
                            //bufferQuery = $@"{bufferQuery} AND [AMPHUR_CODE] = '{amphur_code}'";
                            bufferQuery = $@"IF (EXISTS (SELECT * 
                             FROM INFORMATION_SCHEMA.TABLES 
                             WHERE TABLE_SCHEMA = 'tdadmin' 
                             AND  TABLE_NAME = 'PARCEL_47_{projectParcel.CHANGWAT_CODE}'))
                             BEGIN
                              {bufferQuery}
                             END";
                            resultParcel.AddRange(tdaEntities.Database.SqlQuery<PARCEL_ViewModel>(bufferQuery).ToList());
                        }



                        DbGeometry PARCEL_SHAPE = null;
                        DbGeometry PARCEL_IMPACT_SHAPE = null;
                        int parcelImpactCount = 0;

                        if (resultParcel.Count() > 0)
                        {
                            PARCEL_SHAPE = resultParcel.ElementAt(0).SHAPE;
                            if (PROJECT_AREA_SHAPE != null && PROJECT_AREA_SHAPE.Intersects(PARCEL_SHAPE))
                            {
                                PARCEL_IMPACT_SHAPE = PARCEL_SHAPE;
                                parcelImpactCount = 1;
                            }
                        }
                        for (var i = 1; i < resultParcel.Count(); i++)
                        {
                            var SHAPE = resultParcel.ElementAt(i).SHAPE;

                            if (PROJECT_AREA_SHAPE != null && PROJECT_AREA_SHAPE.Intersects(SHAPE))
                            {
                                var temp2 = PARCEL_IMPACT_SHAPE == null ? SHAPE : PARCEL_IMPACT_SHAPE.Union(SHAPE);
                                if (temp2 != null)
                                {
                                    PARCEL_IMPACT_SHAPE = temp2;
                                    parcelImpactCount++;
                                }
                            }

                            var temp = PARCEL_SHAPE.Union(SHAPE);
                            if (temp != null)
                            {
                                PARCEL_SHAPE = temp;
                            }
                        }

                        /////////////////////////////////

                        dynamic project = new
                        {
                            c.ID,
                            c.SUBJECT_ID,
                            c.SUBJECT_NAME,
                            c.PUBLISH_DATE,
                            c.CREATE_DATE,
                            c.CREATE_BY,
                            c.UPDATE_DATE,
                            c.UPDATE_BY,
                            c.PROVINCE,
                            c.IS_PUBLISHED,
                            STATUS = tdmEntities.STATUS_IMPACT.Where(y => y.ID == statusId).First(),
                            PARCEL_COUNT = resultParcel.Count,
                            PARCEL_PRICE = '-',
                            PROJECT_AREA,
                            PARCEL_SHAPE = PARCEL_SHAPE != null ? PARCEL_SHAPE.ToString() : null,
                            PROJECT_AREA_SHAPE = PROJECT_AREA_SHAPE != null ? PROJECT_AREA_SHAPE.ToString() : null,
                            PARCEL_AREA = resultParcel.Select(x => new SHAPE_ViewModel(x.SHAPE)).ToList(),
                            PARCEL_IMPACT_SHAPE = PARCEL_IMPACT_SHAPE != null ? PARCEL_IMPACT_SHAPE.ToString() : null,
                            PARCEL_IMPACT_COUNT = parcelImpactCount
                        };
                        result.Add(project);
                    }
                }

                result = result.Skip(start).Take(count).ToList();
                return Json(result, jsonSetting);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllStatus()
        {
            try
            {
                return Json(tdmEntities.STATUS_IMPACT.Select(x => new
                {
                    x.ID,
                    x.STATUS_NAME
                }).ToList());
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }



        [HttpPost]
        public HttpResponseMessage UploadMapShape()
        {
            HttpResponseMessage result = null;
            int bcount = 0;
            try
            {
                
                var httpRequest = HttpContext.Current.Request;

                PROJECT_IMPACT importInfo = null;

                if (httpRequest.Form.Count > 0)
                {
                    var imageInfo = httpRequest.Form["ImageInfo"];
                    if (imageInfo != null)
                    {
                        importInfo =  (new System.Web.Script.Serialization.JavaScriptSerializer()).Deserialize<PROJECT_IMPACT>(imageInfo);
                    }
                }



                List<Geometry> geometries = new List<Geometry>(0);
                if (httpRequest.Files.Count > 0)
                {
                    string sessionID = Guid.NewGuid().ToString();



                    var docfiles = new List<string>();
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];

                        string targetFolder = $@"{HttpContext.Current.Server.MapPath("~")}UploadShape\{sessionID}";
                        if (!System.IO.Directory.Exists(targetFolder))
                        {
                            System.IO.Directory.CreateDirectory(targetFolder);
                        }

                        /*save file from client*/
                        var zipFilePath = $@"{targetFolder}\{postedFile.FileName}";
                        postedFile.SaveAs(zipFilePath);
                        docfiles.Add(zipFilePath);

                        /*extract zip file*/
                        var extractFilePath = $"{targetFolder}";
                        System.IO.Compression.ZipFile.ExtractToDirectory(zipFilePath, extractFilePath, System.Text.Encoding.UTF8);

                        /*process unzip file*/

                        var zipDirs = System.IO.Directory.GetDirectories(targetFolder);
                        zipDirs.ToList().ForEach(zipDir =>
                        {
                            var dirs = System.IO.Directory.GetDirectories(zipDir);
                            dirs.ToList().ForEach(dir =>
                            {
                                var loop = true;
                                /*search shape file*/
                                while (loop)
                                {
                                    loop = false;
                                    var files = System.IO.Directory.GetFiles(dir, "*.shp", System.IO.SearchOption.AllDirectories);
                                    /*if dbf file not found then search shp*/
                                    if (files.Count() == 0)
                                    {
                                        files = System.IO.Directory.GetFiles(dir, "*.dbf", System.IO.SearchOption.AllDirectories);
                                    }

                                    files.ToList().ForEach(f =>
                                    {

                                        var fileInfo = new System.IO.FileInfo(f);

                                        try
                                        {
                                            
                                            Shapefile indexMapFile = Shapefile.OpenFile(f);
                                            indexMapFile.Reproject(KnownCoordinateSystems.Geographic.Asia.Indian1975);



                                            TDM.Models.Util.LatLngUTMConverter latLngUTMConverter = new TDM.Models.Util.LatLngUTMConverter("WGS 84");
                                            //var rr = latLngUTMConverter.convertLatLngToUtm(15.000095111201411, 100.64638250268084);

                                            string utmShape = "";
                                            foreach (IFeature feature in indexMapFile.Features)
                                            {
                                                if (feature != null && feature.Geometry != null)
                                                {
                                                    utmShape = feature.Geometry.Coordinates
                                                                .Select(coordinate => latLngUTMConverter.convertLatLngToUtm(coordinate.Y, coordinate.X))
                                                                .Select(utm=> $"{utm.Easting} {utm.Northing}")
                                                                .Aggregate((current, next) => current + ", " + next);
                                                    
                                                    geometries.Add(new Geometry()
                                                    {
                                                        //Shape = feature.Geometry.ToString(),
                                                        Shape = $"{feature.Geometry.OgcGeometryType.ToString().ToUpper()} (({utmShape}))",
                                                        AREA = Convert.ToDecimal(feature.DataRow["AREA"]),
                                                        ORIGIN_X = feature.DataRow["ORIGIN_X"].ToString(),
                                                        ORIGIN_Y = feature.DataRow["ORIGIN_Y"].ToString()
                                                    });
                                                   

                                                }
                                            }
                                        }
                                        catch (Exception ex)
                                        {

                                            string k = "";
                                        }


                                    });
                                }

                            });
                        });


                    }
                    

                    /*save data*/

                    importInfo.ID = 0;
                    importInfo.Area = geometries.Sum(g => g.AREA);
                    PROJECT_IMPACT saveProject = tdmEntities.PROJECT_IMPACT.Add(importInfo);
                    tdmEntities.SaveChanges();

                    foreach (var geometry in geometries)
                    {
                        if (!geometry.Shape.Contains("MULTIPO"))
                        {
                            tdmEntities.PROJECT_IMPACT_GEOMETRY.Add(new PROJECT_IMPACT_GEOMETRY()
                            {
                                ProjectImpactID = importInfo.ID,
                                OriginX = geometry.ORIGIN_X,
                                OriginY = geometry.ORIGIN_Y,
                                Area = geometry.AREA,
                                Shape = (geometry.Shape.Contains("MULTIPO")) ? DbGeometry.MultiPolygonFromText(geometry.Shape, 4326) : DbGeometry.PolygonFromText(geometry.Shape, 4326),
                                UpdateDate = DateTime.Now,
                                CreateDate = DateTime.Now
                            });
                        }
                    }

                    tdmEntities.SaveChanges();

                    result = Request.CreateResponse(HttpStatusCode.Created, "Success");


                }
                else
                {
                    result = Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception exc)
            {

                result = Request.CreateResponse(HttpStatusCode.InternalServerError,exc.Message);
            }
            
            return result;
        }

        [HttpPost]
        public IHttpActionResult GetImpackShapes(ProjectImpactShapeSearch data)
        {
            List<PROJECT_IMPACT_GEOMETRY> results = null;

            var project = tdmEntities.PROJECT_IMPACT.Where(p => p.ID == data.ProjectImpactID).FirstOrDefault();
            results = tdmEntities.PROJECT_IMPACT_GEOMETRY.Where(p => p.ProjectImpactID == data.ProjectImpactID).ToList();

            return Json(new
            {
                ProjectImpactImportedID = data.ProjectImpactID,
                RequireOtherPage = 0,
               Project= project,
                Detail = results.Select(r=> new { Chanode=r.Chanode,
                    Area =r.Area,
                    Shape = r.Shape.WellKnownValue,
                   /**/ REG_P_WAH=r.REG_P_WAH,
                    REG_AMT=r.REG_AMT,
                    RVAL_P_WAH =r.RVAL_P_WAH,
                    RVAL_AMT=r.RVAL_AMT,
                    PROVINCE_ID= r.PROVINCE_ID,
                    ProvinceName= r.PROVINCE_ID.Trim() != "" ? tdaEntities.PROVINCEs.Where(p=>p.PRO_C == r.PROVINCE_ID).FirstOrDefault().NAME_T:"",
                    AMPHOE_ID =r.AMPHOE_ID,
                    AmphoeName = r.AMPHOE_ID.Trim()!="" ? (tdaEntities.AMPHOEs.Where(p => p.DIS_C == r.PROVINCE_ID + r.AMPHOE_ID).FirstOrDefault()!=null?tdaEntities.AMPHOEs.Where(p => p.DIS_C == r.PROVINCE_ID+r.AMPHOE_ID).FirstOrDefault().NAME_T :"") : "",
                    TAMBOL_ID =r.TAMBOL_ID,
                    TambolName = r.TAMBOL_ID.Trim() != "" ? (tdaEntities.TAMBOLs.Where(p => p.SUB_C == r.PROVINCE_ID + r.AMPHOE_ID + r.AMPHOE_ID).FirstOrDefault()!=null? tdaEntities.TAMBOLs.Where(p => p.SUB_C == r.PROVINCE_ID + r.AMPHOE_ID+r.AMPHOE_ID).FirstOrDefault().NAME_T:"") :""

                }).ToList(),
                     PageNo = data.PageNo,
                     Shapes = results.Select(r => r.Shape.WellKnownValue).ToList(),

                 }, jsonSetting);

          


        }



        [HttpPost]
        public IHttpActionResult SearchImpackShapes(ProjectImpactShapeSearch data)
        {
            var repos = new TDAssetRespository();

            List<PROJECT_IMPACT_GEOMETRY> results = null;

            var project = tdmEntities.PROJECT_IMPACT.Where(p => p.ID == data.ProjectImpactID).FirstOrDefault();
            results = repos.SearcPROJECT_IMPACT_GEOMETRY(data);

            return Json(new
            {
                ProjectImpactImportedID = data.ProjectImpactID,
                RequireOtherPage = 0,
                Project = project,
                Detail = results.Select(r => new {
                    Chanode = r.Chanode,
                    Area = r.Area,
                    Shape = r.Shape.WellKnownValue,
                    REG_P_WAH = r.REG_P_WAH,
                    REG_AMT = r.REG_AMT,
                    RVAL_P_WAH = r.RVAL_P_WAH,
                    RVAL_AMT = r.RVAL_AMT,
                    PROVINCE_ID = r.PROVINCE_ID,
                    ProvinceName = r.PROVINCE_ID.Trim() != "" ? tdaEntities.PROVINCEs.Where(p => p.PRO_C == r.PROVINCE_ID).FirstOrDefault().NAME_T : "",
                    AMPHOE_ID = r.AMPHOE_ID,
                    AmphoeName = r.AMPHOE_ID.Trim() != "" ? tdaEntities.AMPHOEs.Where(p => p.DIS_C == r.PROVINCE_ID + r.AMPHOE_ID).FirstOrDefault().NAME_T : "",
                    TAMBOL_ID = r.TAMBOL_ID,
                    TambolName = r.TAMBOL_ID.Trim() != "" ? tdaEntities.TAMBOLs.Where(p => p.SUB_C == r.PROVINCE_ID + r.AMPHOE_ID + r.AMPHOE_ID).FirstOrDefault().NAME_T : ""

                }).ToList(),
                PageNo = data.PageNo,
                Shapes = results.Select(r => r.Shape.WellKnownValue).ToList(),

            }, jsonSetting);




        }





    }

}
