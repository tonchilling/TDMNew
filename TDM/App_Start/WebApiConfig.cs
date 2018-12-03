using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Serialization;
using System.Net.Http.Headers;
using System.Web.SessionState;
using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Net.Http.Formatting;
using AutoMapper;
using TDM.Models;

namespace TDM
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
            config.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("multipart/form-data"));

            Mapper.Initialize(cfg => {
                cfg.CreateMap<POI, POI_ViewModel>();
                cfg.CreateMap<PROJECT_AREA_47, PROJECT_AREA_ViewModel>();
                cfg.CreateMap<PROJECT_AREA_48, PROJECT_AREA_ViewModel>();
                cfg.CreateMap<STATUS_IMPACT, STATUS_IMPACT_ViewModel>();
                cfg.CreateMap<PROVINCE, PROVINCE_ViewModel>();
                cfg.CreateMap<PROJECT_IMPACT, PROJECT_IMPACT_ViewModel>();
                cfg.CreateMap<TAMBOL, TAMBOL_ViewModel>();
                cfg.CreateMap<AMPHOE, AMPHOE_ViewModel>();
            });
        }
    }
}

