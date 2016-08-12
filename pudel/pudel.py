"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
import json
from xblock.core import XBlock
from xblock.fields import Scope, Integer, String
from xblock.fragment import Fragment


class PudelXBlock(XBlock):
  
    arr=[]
    

    #this is a list where we search matchings from textbox input
    mas=['aaa','aa','a','bbb','bb','cccc','ccc','cc','c','d','dd','ddd','dddd','ddddd']
    
    #Fields

    but = String(
        default=None, scope=Scope.settings,
        help="shows next nuber",
    )
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the PudelXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/pudel.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/pudel.css"))
        frag.add_javascript(self.resource_string("static/js/src/pudel.js"))
        frag.initialize_js('PudelXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    

    #Not important handler
    
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'
        
        self.count += 1
        #perhaps it's block_id
        #self.arr.append(self.scope_ids.usage_id)
        self.but = json.dumps(self.arr)
        return {"count": self.count}
    

        #_____Importatn handler_____


    @XBlock.json_handler
    def sub_but(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        #assert data['hello'] == 'world'
        
        self.count += 1
        self.m=data['key']
        self.arr[:]=[]
        for self.n in self.mas:
            if self.n.startswith(self.m):
                self.arr.append(self.n)
        

        #perhaps it's block_id, but there is no use of it in SDK, and studio does not work on my laptop
        #self.arr.append(self.scope_ids.usage_id)
        
        #self.count is not important. Main data is at self.but

        self.but = json.dumps(self.arr)
        return {"count": self.count, "but": self.but}





    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("PudelXBlock",
             """<pudel/>
             """),
            ("Multiple PudelXBlock",
             """<vertical_demo>
                <pudel/>
                <pudel/>
                <pudel/>
                </vertical_demo>
             """),
        ]
