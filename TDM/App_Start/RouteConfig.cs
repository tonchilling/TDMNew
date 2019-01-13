﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TDM
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                //defaults: new { controller = "Dashboard", action = "Index", id = UrlParameter.Optional }
                //defaults: new { controller = "Home", action = "System_3_with_Layout", id = UrlParameter.Optional }

                defaults: new { controller = "DashboardSystem3", action = "Index", id = UrlParameter.Optional }

            );

            //routes.MapMvcAttributeRoutes();
        }
    }
}
