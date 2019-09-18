using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TDM.Controllers
{
    public class BIController : BaseController
    {
        // GET: BI
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Summary()
        {
            return View();
        }

        public ActionResult BIManagement()
        {
            return View();
        }

        public ActionResult BIManager()
        {
            return View();
        }

        public ActionResult BIViewer()
        {
            return View();
        }
    }
}