using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TDM.Controllers
{
    public class SharedController : Controller
    {
        // GET: Shared
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetView(string viewName, string data)
        {
            return PartialView(viewName);
        }

        public ActionResult GetPageFunction2()
        {
            return PartialView("../BI/_BI1");
        }

        public ActionResult GetPageFunction3()
        {
            return PartialView("../BI/_BI2");
        }


        public ActionResult GetPageFunction4()
        {
            //return PartialView("_PartialPage_Output_3_System_3");
            return PartialView("../BI/_BI3");
        }


        public ActionResult GetPageFunction5()
        {
            return PartialView("_PartialPage_Output_4_System_3");
        }

        public ActionResult GetPageFunction6()
        {
            return PartialView("_PartialPage_Output_5_System_3");
        }

        public ActionResult GetPageChart()
        {
            return PartialView("../TraceProgress/_Charts");
        }

        public ActionResult GetPageRegion()
        {
            return PartialView("../TraceProgress/_Region");
        }

        public ActionResult GetPageProvince(string RegionId)
        {
            ViewData["Region"] = RegionId;
            //return PartialView("../TraceProgress/_Province");
            return PartialView("../TraceProgress/_ProvinceTimeline");
        }

        public ActionResult GetPageDistrict(string Province)
        {
            ViewData["Province"] = Province;
            return PartialView("../TraceProgress/_District", Province);
        }

        public ActionResult GetPageTambon(string Province, string District)
        {
            ViewData["Province"] = Province;
            ViewData["District"] = District;
            return PartialView("../TraceProgress/_Tambon", Province);
        }


    }
}