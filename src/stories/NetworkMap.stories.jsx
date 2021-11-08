import React from 'react';
import * as d3 from 'd3';

import { NetworkMapComponent } from '../NetworkMap/NetworkMap.component.js';
import dataFlat from '../data/UAE-families.js'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Charts/NetworkGraph',
};







export function BasicNetworkMap({ dimension, rootName, initialDepth, initialLinkColor, dataFlat }) {
  const keys = Object.keys(dataFlat[0]);
  const hKeys = keys.filter(d => d.indexOf('node') != -1)
    .filter((d, i, arr) => i != arr.length - 1);
  const hkf = hKeys.map(k => {
    return (d) => d[k];
  })
  const data = transformFlatHierarchy({
    map: d3.group(dataFlat,
      ...hkf
    ),
    rootTitle: rootName,
    rootType: 'root'
  })

  return (
    <NetworkMapComponent

      svgWidth={dimension}
      svgHeight={dimension}
      initialLinkColor={initialLinkColor}
      initialDepth={initialDepth}
      data={data}

    />
  );
}

BasicNetworkMap.story = {
  name: 'Basic Network Map',
}

BasicNetworkMap.args = {
  dimension: 800,
  initialLinkColor: '#688487',
  dataFlat: dataFlat,
  initialDepth: 1,
  rootName: 'Agritech',
}



function transformFlatHierarchy({ map, rootTitle, rootType, columns }) {
  let obj = {
    name: rootTitle || 'root',
    type: rootType || 'root'
  };
  let depth = 0;
  function process(item, key, map, parent, depth) {
    if (!parent.children) parent.children = [];
    if (key === '' && !(item instanceof Map)) {
      parent.children = parent.children.concat(item);
      return;
    } else if (key == '' && item instanceof Map) {
      item.forEach((d, k, m) => process(d, k, m, parent, depth + 1));

      return;
    }
    const child = {
      name: key,
      _type: 'level',
      type: (columns && columns[depth]) || 'level'
    };
    parent.children.push(child);
    if (item instanceof Map) {
      item.forEach((item, key, map) =>
        process(item, key, map, child, depth + 1)
      );
    } else {
      child.children = item;
    }
  }
  map.forEach((item, key, map) => process(item, key, map, obj, depth));
  return obj;
}