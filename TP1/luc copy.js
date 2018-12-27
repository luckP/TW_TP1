function lucStyle(){
    let style = '\n.luc-slides-component{\n';
    style += 'height:100vw;\n';
    style += 'overflow: hidden;\n';
    style += 'display: block;\n';
    style += '';
    style += '';
    style += '}';
    return style;
}

class LucComponent{
    constructor(obj_luc){
        this.obj_luc = obj_luc;
    }
    // fazer
    slide(){
        this.obj_luc.attr('className', this.className+' .luc-slides-component');
        for(var i in this.obj_luc.elements){

        }

        // let slides_component = $luc(this.obj_luc.reference+' .slide');
        // slides_component.styleMultiple({});
        // for(var i in this.obj_luc.elements){
        //     let slides = this.obj_luc.elements[i].getElementsByClassName('slide');
        //     this.obj_luc.style('height', '100vh');
        //     this.obj_luc.style('width', 100*slides.length+'%');
        //     slides_total.style('width', '100vw');
        //     slides_total.style('height', '100%');
        //     var button_container = document.createElement('div');
        //     button_container.className = 'luc_slide_bottom_buttons';
        //     for(var j=0; j<slides.length; j++){
        //         let b = document.createElement('button');
        //         let str = 'slideClickBottomButton('+this.obj_luc.elements[i].toString()+','+j+');';
        //         console.log(str);
        //         b.className = 'luc_slide_bottom_button';
        //         b.setAttribute('onclick', 'slideClickBottomButton('+String(this.obj_luc.elements[i])+','+j+');');
        //         // console.log(this.obj_luc.elements[i]);
        //         // b.onclick = function(){slideClickBottomButton(this.obj_luc.elements[i],j)};
        //         button_container.appendChild(b);
        //     }
        //     this.obj_luc.elements[i].appendChild(button_container);
            // console.log(this.obj_luc.elements);
        // }
    }
}

class LucElement{
    constructor(e){
        this.element = e;
    }

    style(p, s){
        this.element.style[p] = s;
    }
}

class Luc{
    constructor(elements, reference){
        this.elements = elements;
        this.reference = reference;
    }
    // change element style
    style(p, s){
        for(var i in this.elements){
            this.elements[i].style[p] = s;
        }
    }

    styleMultiple(obj){
        for(var i in this.elements){
            for(var j in obj){
                this.elements[i].style[j] = obj[j];
            }
        }
    }
    // create an animation for eatch element
    animation(obg_animation, time, after_animation){
            let element_transition = [];
            for(var i in this.element)
                element_transition.push(this.elements[i].style.transition);

            setTimeout(function(t){
                t.style('transition', time/1000+'s');
                t.styleMultiple(obg_animation);
                }, 0, this);

            setTimeout(function(t){
                t.style('transition', '');
                for(var p in after_animation){
                    t.style(p, after_animation[p]);
                }

            setTimeout((t)=>{for(var i in this.elements) this.elements[i].style.transition = element_transition.shift();}, time*2, this);

                }, time, this);
    }

    attr(attr_name, attr_val){
        // console.log('attribut:' + attr_val)
        if (attr_val == null){
            let vals = [];
            for(i in this.elements){
                vals.push(this.elements[i][attr_name]);
            }
            // return (vals.length == 1? vals[0]: vals);
            return vals;
        }
        let functions_list = ['onclick'];
        if(functions_list.indexOf(attr_name)!=-1){
            for(var i in this.elements){
                this.elements[i][attr_name] = attr_val;
            }
        }
        else{
            console.log(attr_val);
            if(attr_name == 'id' && this.elements.length!=1){
                console.error('elementos nao podem ter o mesmo valor de id');
                return;
            }

            for(var i in this.elements){
                this.elements[i][attr_name] = attr_val;
            }
        }
    }

    createComponent(){
        return new LucComponent(this);
    }
}

function $luc(str){
    let tok = str.split(' ');
    let doc = [document];

    while(tok.length != 0){
        t = tok.shift();
        let doc_aux = [];
        while(doc.length!=0){
            let e = doc.shift();
            switch (t.slice(0, 1)){
                case '#': doc_aux.push([document.getElementById(t.slice(1, t.length))]); doc=[]; break;
                case '.': doc_aux.push(e.getElementsByClassName(t.slice(1, t.length))); break;
                default : doc_aux.push(e.getElementsByTagName(t));
            }
        }
        for(var i=0; i<doc_aux.length; i++){
            for(var j=0; j<doc_aux[i].length; j++)
                doc.push(doc_aux[i][j]);
            }
    }
    return new Luc(doc, str);
}


window.onload = function(){
    var css = lucStyle(),
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
    } else {
    style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
};