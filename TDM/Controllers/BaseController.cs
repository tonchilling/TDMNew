using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web;
using System.Web.Mvc;
using TDM.Repositories;
using TDM.Models.ViewModels;
using System.Web.Script.Serialization;

namespace TDM.Controllers
{
    public class BaseController : Controller
    {
        private TDAssetRespository repos = null;
        UserProFile userProfile = null;
        public  BaseController()
            {
          //  ManageSession();


             }

        [HttpPost]
        public JsonResult TakeSession(string userId)
        {
          //  string userId = (System.Web.HttpContext.Current.Request != null && System.Web.HttpContext.Current.Request.Form["UserId"]!= null) ? System.Web.HttpContext.Current.Request.Form["UserId"]:"" ;
            repos = new TDAssetRespository();
           
            if (System.Web.HttpContext.Current.Session["UserPermission"] == null && userId != "")
            {
                userProfile = repos.GetPermission(userId);
                System.Web.HttpContext.Current.Session.Add("UserPermission", userProfile);
            }
            else {
                userProfile = (UserProFile)System.Web.HttpContext.Current.Session["UserPermission"];
            }

            return Json(userProfile);
        }
          
    }
}