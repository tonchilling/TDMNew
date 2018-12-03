using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using TDM.Models;

namespace TDM.Controllers
{
    public class AreaAnalysisController : Controller
    {
        public TDManagementEntities db = new TDManagementEntities();
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
            }
            return PartialView("Manage_Modal", model);
        }
    }
}