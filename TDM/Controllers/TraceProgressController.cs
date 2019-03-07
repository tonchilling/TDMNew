using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TDM.Controllers
{
    public class TraceProgressController : Controller
    {
        public string Region = "0";
        // GET: TraceProgress
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult _TraceProgressOverview()
        {
            return View();
        }

        [HttpGet]
        public PartialViewResult GetPageRegion()
        {
            return PartialView("_Region");
        }

        [HttpGet]
        public PartialViewResult GetPageCharts()
        {
            return PartialView("_Charts");
        }

        [HttpGet]
        public PartialViewResult GetPageProvine(string Region)
        {
            ViewData["Region"] = Region;
            return PartialView("_Province", Region);
        }

        [HttpGet]
        public PartialViewResult GetPageDistrict(string Province)
        {
            ViewData["Province"] = Province;
            return PartialView("_District", Province);
        }

        [HttpGet]
        public PartialViewResult GetPageTambon(string Province,string District)
        {
            ViewData["Province"] = Province;
            ViewData["District"] = District;
            return PartialView("_Tambon");
        }

        [HttpGet]
        public PartialViewResult GetPageLoginHistory()
        {
            return PartialView("_LoginHistory");
        }
    }
}