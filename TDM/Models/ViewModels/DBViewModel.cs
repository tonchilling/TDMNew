using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TDM.Models.ViewModels
{
    public class DBViewModel
    {
  
            public string Server { get; set; }
            public string User { get; set; }
            public string Password { get; set; }
        public string Query { get; set; }


    }

    public class Databases
    {
            public string Database { get; set; }
            public List<TableAll> Tables { get; set; }
            public List<ColumnAll> Columns { get; set; }

    }

    public class Tables
    {

        public List<string> Columns { get; set; }
    }



    public class TableAll
    {

        public string Database { get; set; }
        public string Table { get; set; }
        public List<ColumnAll> Columns { get; set; }
    }

    public class ColumnAll
    {

        public string Database { get; set; }
        public string Table { get; set; }
        public string Column { get; set; }
    }



}