using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using TDM.Models;
using AutoMapper;
namespace TDM.Controllers
{
    public class AreaAnalysisController : Controller
    {
        public  TDManagementEntities db = new TDManagementEntities();
        public TDASSETEntities tdaEntities = new TDASSETEntities();
        public IEnumerable<SelectListItem> ProvinceList { get; set; }

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Manage()
        {
            
            return View();
            
        }

        public ActionResult AddEditProject(int projectId, int statusId = 0)
        {
            PROJECT_IMPACT_ViewModel model = new PROJECT_IMPACT_ViewModel();
            tdaEntities.Configuration.ProxyCreationEnabled = false;/**/
            if (projectId > 0)
            {
                PROJECT_IMPACT project = db.PROJECT_IMPACT.SingleOrDefault(x => x.ID == projectId && x.IS_DELETED == false);
                model.ID = project.ID;
                model.IS_DELETED = project.IS_DELETED;
                model.SUBJECT_ID = project.SUBJECT_ID;
                model.SUBJECT_NAME = project.SUBJECT_NAME;
                model.PUBLISH_DATE = project.PUBLISH_DATE;
                model.UPDATE_BY = project.UPDATE_BY;
                model.UPDATE_DATE = project.UPDATE_DATE;
                model.CREATE_DATE = project.CREATE_DATE;
                model.CREATE_BY = project.CREATE_BY;
                model.IS_PUBLISHED = project.IS_PUBLISHED;
                model.STATUS_ID = statusId;
                model.PROVINCE_ID = project.PROVINCE_ID;
                model.AMPHOE_ID = project.AMPHOE_ID;
                model.TAMBOL_ID = project.TAMBOL_ID;
                model.Shape = project.Shape != null ? project.Shape.ToString() : "" ;
            }
            try
            {
                

                model.PROVINCE = tdaEntities.PROVINCEs.Select(r => new PROVINCE_ViewModel()
                {
                    PRO_C = r.PRO_C,
                    ON_PRO_THA = r.ON_PRO_THA
                    
                }).ToList();

                model.AMPHOE = tdaEntities.AMPHOEs.Where(a=>a.PRO_C== model.PROVINCE_ID).Select(r => new AMPHOE_ViewModel()
                {
                    DIS_C = r.DIS_C,
                    ON_DIS_THA = r.ON_DIS_THA

                }).ToList();

                model.TAMBOL = tdaEntities.TAMBOLs.Where(a => a.DIS_C == model.AMPHOE_ID).Select(r => new TAMBOL_ViewModel()
                {
                    SUB_C = r.SUB_C,
                    ON_SUB_THA = r.ON_SUB_THA

                }).ToList();


                if(model.PUBLISH_DATE == null)
                {
                    model.PUBLISH_DATE = DateTime.Now;
                }
            }
            catch(Exception ex) {
                return Json(ex);
            }
            /*



                                                                                var json = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(model);
            var json = System.IO.File.ReadAllText(@"C:\inetpub\wwwroot\GitHub\TDMNew\3Parties\json.txt");

            model = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<PROJECT_IMPACT_ViewModel>(json);*/

            return PartialView("Manage_Modal", model);
        }


        public ActionResult AddEditProjectVII()
        {
            var json = System.IO.File.ReadAllText(@"C:\inetpub\wwwroot\GitHub\TDMNew\3Parties\json.txt");

            var model = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<PROJECT_IMPACT_ViewModel>(json);
            return View("AddEditProjectVII", model);
        }

        public ActionResult TestMap()
        {
            return View("TestMap");
        }
            
    }
}