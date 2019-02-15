'use strict';
class DeeperFocusOpeningBracket {
  constructor () {
    this.type = 'Deeper Focus'
    this.description = 'Début de traitement d\'un niveau de profondeur du flux.'
    this.editor = 'deeper-focus-opening-bracket-editor'
    this.graphIcon = 'Deeper_focus.png'
    this.tags = [
      'http://semantic-bus.org/data/tags/middleComponents',
      'http://semantic-bus.org/data/tags/middleUtilitiesComponents'
    ]
  }

  pull (data, flowData) {
    return new Promise((resolve, reject) => {
      // console.log('dfob specific data',data.specificData);
      // console.log('dfob | pull : ',data,' | ',flowData);
      var dfob = flowData[0].dfob == undefined ? []:flowData.dfob
      let dfobPath = data.specificData.dfobPath == undefined ? '':data.specificData.dfobPath
      // console.log('focus add',{path:dfobPath,keppArray:data.specificData.keepArray});
      dfob.push({ path: dfobPath, keepArray: data.specificData.keepArray })
      //console.log('Deeper Focus Opening Bracket |  ',dfob);
      resolve({ data: flowData[0].data, dfob: dfob })
    })
  }
}
module.exports = new DeeperFocusOpeningBracket()
