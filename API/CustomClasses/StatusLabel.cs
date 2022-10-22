using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.CustomClasses
{
    public class StatusLabel
    {
        public StatusLabel(int position, string name)
        {
            Position = position;
            Name = name;
        }

        public int Position { get; set; }
        public string Name { get; set; }

        
    }
}