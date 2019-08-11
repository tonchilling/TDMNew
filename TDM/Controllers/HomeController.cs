using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDM.Repositories;
namespace TDM.Controllers
{
    public class HomeController : Controller
    {
        TDAssetRespository repos = new TDAssetRespository();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult System_3_with_Layout()
        {
            return View("System_3_with_Layout");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Menu1()
        {
            ViewData["RegisterYear"] = repos.GetLandRegisterYear();

            return View();
        }
        public ActionResult Menu2()
        {
            return View();
        }
        public ActionResult Menu3()
        {
            return View();
        }
    }
}