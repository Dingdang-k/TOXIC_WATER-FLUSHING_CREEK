import config from './config.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFveXVhbmt1YW5nIiwiYSI6ImNtN2NhYWZuZDBvYW8ycnE4OXF1b2Z6ZXgifQ.NJu5ySndWQQfetxImL1Owg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/haoyuankuang/cm9hgconm00l301qkgxcc9gs1',
  center: [-73.840, 40.760],
  zoom: 15,
  pitch: 0,
  bearing: 0,
});

// 禁用交互
map.scrollZoom.disable();
map.boxZoom.disable();
map.dragRotate.disable();
map.dragPan.disable();
map.keyboard.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

// 全局函数
window.lockMap = function () {
  map.dragPan.disable();
  map.scrollZoom.disable();
  map.doubleClickZoom.disable();
};

window.fadeOutCover = function () {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.add("fade-out-up");
  }
};

window.fadeInCover = function () {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.remove("fade-out-up");
    overlay.style.opacity = 1;
    overlay.style.transform = "translateY(0)";
  }
};

window.revealStoryPanel = function () {
  const story = document.getElementById("story");
  story.style.opacity = 1;
  story.style.pointerEvents = "auto";
};

window.showLegend = function () {
  document.getElementById('legend').style.display = 'block';
};

window.hideLegend = function () {
  document.getElementById('legend').style.display = 'none';
};

window.showGreenLayer = function () {
  if (map.getLayer('greenspace-layer')) {
    map.setPaintProperty('greenspace-layer', 'fill-opacity', 0.7);
  }
  if (map.getLayer('highlight-green')) {
    map.setPaintProperty('highlight-green', 'line-opacity', 1);
  }
};

window.hideGreenLayer = function () {
  if (map.getLayer('greenspace-layer')) {
    map.setPaintProperty('greenspace-layer', 'fill-opacity', 0);
  }
  if (map.getLayer('highlight-green')) {
    map.setPaintProperty('highlight-green', 'line-opacity', 0);
  }
};

window.showHighlightOverlay = function () {
  map.setPaintProperty('highlight-green-overlay-layer', 'fill-opacity', 0.5);
};

window.hideHighlightOverlay = function () {
  map.setPaintProperty('highlight-green-overlay-layer', 'fill-opacity', 0);
};

window.showchapterone = function () {
  map.setPaintProperty('chapterone', 'raster-opacity', 1);
};

window.hidechapterone = function () {
  map.setPaintProperty('chapterone', 'raster-opacity', 0);
};

window.showchaptertwo = function () {
  map.setPaintProperty('chaptertwo', 'raster-opacity', 1);
};

window.hidechaptertwo = function () {
  map.setPaintProperty('chaptertwo', 'raster-opacity', 0);
};

window.showchapterthree = function () {
  map.setPaintProperty('chapterthree', 'raster-opacity', 1);
};

window.hidechapterthree = function () {
  map.setPaintProperty('chapterthree', 'raster-opacity', 0);
};

window.showchapterfour = function () {
  map.setPaintProperty('chapterfour', 'raster-opacity', 1);
};

window.hidechapterfour = function () {
  map.setPaintProperty('chapterfour', 'raster-opacity', 0);
};

const calloutData = [
  {
    id: "callout1",
    title: "U-Haul Marsh",
    img: "./img/40.7606063,-73.838149,83.png",
    text: "A once marshy zone.",
    coords: [-73.838149, 40.7606063],
    top: "20%",
    left: "25%"
  },
  {
    id: "callout2",
    title: "Willets Point Wetland",
    img: "./img/40.7615498,-73.8379825.png",
    text: "The wetland as green edge of the creek.",
    coords: [-73.8379825, 40.7615498],
    top: "43%",
    left: "30%"
  },
  {
    id: "callout3",
    title: "Willow Lake",
    img: "./img/40.7214761,-73.8313989.jpg",
    text: "Reeds dominated the willow lakeside.",
    coords: [-73.8313989, 40.7214761],
    top: "60%",
    right: "30%"
  },
  {
    id: "callout4",
    title: "Marshy Meadow",
    img: "./img/40.7578823,-73.8376855,81.png",
    text: "Natural Growth in Ruins.",
    coords: [-73.8376855, 40.7578823],
    bottom: "45%",
    right: "25%"
  },

];


window.showCallouts = function () {
  const container = document.getElementById("map");
  calloutData.forEach(item => {
    const box = document.createElement("div");
    box.className = "callout-box fixed-callout";
    box.setAttribute("id", item.id);
    box.innerHTML = `
      <h4>${item.title}</h4>
      <img src="${item.img}" />
      <p>${item.text}</p>
    `;

    if (item.top) box.style.top = item.top;
    if (item.left) box.style.left = item.left;
    if (item.right) box.style.right = item.right;
    if (item.bottom) box.style.bottom = item.bottom;

    container.appendChild(box);
    setTimeout(() => box.classList.add("show"), 50);
  });

  setTimeout(() => {
    drawCalloutLinesAndPoints(calloutData); // ✅ 正确传参
  }, 600);
};



window.hideCallouts = function () {
  calloutData.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 800);
    }
  });

  if (map.getLayer('callout-lines-layer')) map.removeLayer('callout-lines-layer');
  if (map.getSource('callout-lines')) map.removeSource('callout-lines');

  if (map.getLayer('callout-point-layer')) map.removeLayer('callout-point-layer');
  if (map.getSource('callout-points')) map.removeSource('callout-points');
};


function drawCalloutLinesAndPoints(dataArray) {
  const features = [];
  const points = [];

  dataArray.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const screenCenter = [rect.left + rect.width / 2, rect.top + rect.height / 2];
    const geoCoord = map.unproject(screenCenter);

    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [geoCoord.lng, geoCoord.lat],
          item.coords
        ]
      }
    });

    points.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: item.coords
      }
    });
  });

  // 添加或更新线条图层
  if (!map.getSource('callout-lines')) {
    map.addSource('callout-lines', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features }
    });
    map.addLayer({
      id: 'callout-lines-layer',
      type: 'line',
      source: 'callout-lines',
      layout: { 'line-cap': 'round' },
      paint: {
        'line-color': '#999',
        'line-opacity': 0.6,
        'line-width': 1.5,
        'line-dasharray': [2, 2]
      }
    });
  } else {
    map.getSource('callout-lines').setData({ type: 'FeatureCollection', features });
  }

  // 添加或更新圆点 anchor 图层
  if (!map.getSource('callout-points')) {
    map.addSource('callout-points', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: points }
    });
    map.addLayer({
      id: 'callout-point-layer',
      type: 'circle',
      source: 'callout-points',
      paint: {
        'circle-radius': 5,
        'circle-color': '#ff6600',
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1.5
      }
    });
  } else {
    map.getSource('callout-points').setData({ type: 'FeatureCollection', features: points });
  }
}




map.on('load', () => {
  // 添加 creek 数据源和图层
  map.addSource('flushing-creek', {
    type: 'geojson',
    data: './data_set/river_outlines1.json'
  });

  map.addLayer({
    id: 'flushing-creek-fill',
    type: 'fill',
    source: 'flushing-creek',
    paint: {
      'fill-color': '#a8dadc',
      'fill-opacity': 0.6
    }
  });

  window.addGreenLayer = function () {
    if (!map.getSource('greenspace')) {
      map.addSource('greenspace', {
        type: 'geojson',
        data: './data_set/NYC_GREENERY_OPENSPACE.geojson'  // ✅ 重命名无空格
      });
  
      map.addLayer({
        id: 'greenspace-layer',
        type: 'fill',
        source: 'greenspace',
        paint: {
          'fill-color': '#c6edc4',     // ✅ 更鲜明绿色
          'fill-opacity': 0.7          // ✅ 提高不透明度
        }
      }, 'flushing-creek-fill');
    }
  };

  window.addchapterone = function () {
    if (!map.getSource('chapterone')) {
      map.addSource('chapterone', {
        type: 'image',
        url: './img/chapterbase/11.png',  
        coordinates: [
          [-73.81278, 40.78028],
          [-73.81444, 40.70528], 
          [-73.86528, 40.70583],
          [-73.86361, 40.78111], 
        ] 
      })
  
      map.addLayer({
        id: 'chapterone',
        type: 'raster',
        source: 'chapterone',
        paint: {
          'raster-opacity': 1 // 初始设置为不可见
        }
      });  
    }
  };

  window.addchaptertwo = function () {
    if (!map.getSource('chaptertwo')) {
      map.addSource('chaptertwo', {
        type: 'image',
        url: 'img/chapterbase/22.png',  
        coordinates: [
          [-73.81278, 40.78028],
          [-73.81444, 40.70528], 
          [-73.86528, 40.70583],
          [-73.86361, 40.78111], 
        ] 
      })
  
      map.addLayer({
        id: 'chaptertwo',
        type: 'raster',
        source: 'chaptertwo',
        paint: {
          'raster-opacity': 1 // 初始设置为不可见
        }
      });  
    }
  };

  window.addchapterthree = function () {
    if (!map.getSource('chapterthree')) {
      map.addSource('chapterthree', {
        type: 'image',
        url: 'img/chapterbase/33.png',  
        coordinates: [
          [-73.81278, 40.78028],
          [-73.81444, 40.70528], 
          [-73.86528, 40.70583],
          [-73.86361, 40.78111], 
        ] 
      })
  
      map.addLayer({
        id: 'chapterthree',
        type: 'raster',
        source: 'chapterthree',
        paint: {
          'raster-opacity': 1 // 初始设置为不可见
        }
      });  
    }
  };

  window.addchapterfour = function () {
    if (!map.getSource('chapterfour')) {
      map.addSource('chapterfour', {
        type: 'image',
        url: 'img/chapterbase/44.png',  
        coordinates: [
          [-73.81278, 40.78028],
          [-73.81444, 40.70528], 
          [-73.86528, 40.70583],
          [-73.86361, 40.78111], 
        ] 
      })
  
      map.addLayer({
        id: 'chapterfour',
        type: 'raster',
        source: 'chapterfour',
        paint: {
          'raster-opacity': 1 // 初始设置为不可见
        }
      });  
    }
  };
  
  window.addHighlightOverlayLayer = function () {
    if (!map.getSource('highlight-green-overlay')) {
      map.addSource('highlight-green-overlay', {
        type: 'geojson',
        data: './data_set/highlight_green_openspace.geojson'
      });
  
      map.addLayer({
        id: 'highlight-green-overlay-layer',
        type: 'fill',
        source: 'highlight-green-overlay',
        paint: {
          'fill-color': '#448542',
          'fill-opacity': 0
        }
      }, 'flushing-creek-fill');  // 插入在 creek 图层之下
    }
  };
  

  // 生成章节 DOM
  const featuresEl = document.getElementById('features');
  config.forEach((chapter) => {
    const container = document.createElement('div');
    container.setAttribute('id', chapter.id);
    container.classList.add('step');

    // ✅ 添加布局类
    if (chapter.alignment === 'center') {
      container.classList.add('centered');
    } else if (chapter.alignment === 'left') {
      container.classList.add('lefty');
    } else if (chapter.alignment === 'right') {
      container.classList.add('righty');
    }

    if (chapter.title) {
      const title = document.createElement('h3');
      title.innerHTML = chapter.title;
      container.appendChild(title);
    }

    if (chapter.description) {
      const desc = document.createElement('div');
      desc.innerHTML = chapter.description;
      container.appendChild(desc);
    }

    featuresEl.appendChild(container);
  });

  // 初始化 Scrollama
  const scroller = scrollama();
  scroller
    .setup({
      step: '.step',
      offset: 0.7,
      debug: false
    })
    .onStepEnter(response => {
      const chapter = config.find(c => c.id === response.element.id);
      if (!chapter) return;

      document.querySelectorAll(".step").forEach(el => el.classList.remove("is-active"));
      response.element.classList.add("is-active");

      if (chapter.id !== "flushing-creek-intro") {
        map.flyTo(chapter.location);

        if (chapter.id === "geography-context") {
          map.once("moveend", () => {
            const currentStep = document.querySelector(".step.is-active");
            if (currentStep && currentStep.id === "geography-context") {
              window.showOverlayImage?.();
            }
          });
        }
      }

      if (chapter.onChapterEnter) {
        chapter.onChapterEnter.forEach(action => {
          if (action.layer) {
            map.setPaintProperty(action.layer, 'fill-opacity', action.opacity);
          } else if (
            action.callback &&
            typeof window[action.callback] === "function"
          ) {
            if (action.callback !== "showOverlayImage") {
              window[action.callback]();
            }
          }
        });
      }
    })
    .onStepExit(response => {
      const chapter = config.find(c => c.id === response.element.id);
      if (!chapter) return;

      if (chapter.onChapterExit) {
        chapter.onChapterExit.forEach(action => {
          if (action.layer) {
            map.setPaintProperty(action.layer, 'fill-opacity', action.opacity);
          } else if (
            action.callback &&
            typeof window[action.callback] === "function"
          ) {
            window[action.callback]();
          }
        });
      }

      if (chapter.id === "geography-context") {
        map.flyTo({
          center: [-73.840, 40.760],
          zoom: 15,
          pitch: 0,
          bearing: 0,
          duration: 1000
        });
      }
    });

  scroller.resize();

  window.addPollutionLayer = function () {
    if (!map.getSource('polluted-zone')) {
      map.addSource('polluted-zone', {
        type: 'geojson',
        data: './data_set/polluted_area.geojson'
      });
  
      map.addLayer({
        id: 'polluted-zone-layer',
        type: 'fill',
        source: 'polluted-zone',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'Vulnerability_Score_Percentile'],
            0, '#fff7bc',
            0.25, '#fec44f',
            0.5, '#fc9272',
            0.75, '#de2d26',
            1, '#a50f15'
          ],
          'fill-opacity': 1,
          'fill-outline-color': '#f9f9f9'
        }
      }, 'greenspace-layer');  // 插在 greenspace-layer 上方
      
  
  
      
    }
  };

  

  // 添加 water quality 图层
 window.addWaterQualityLayer = function () {
  if (!map.getSource('water-quality')) {
    map.addSource('water-quality', {
      type: 'geojson',
      data: './data_set/flushing_water_quality.geojson'
    });

    map.addLayer({
      id: 'water-quality-layer',
      type: 'circle',
      source: 'water-quality',
      layout: {
        visibility: 'none'  // ✅ 初始隐藏
      },
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'geomean'],
          0, 4,
          100, 8,
          500, 12,
          1000, 18,
          2000, 22
        ],
        'circle-color': [
          'interpolate', ['linear'], ['get', 'geomean'],
          0, '#a1dab4',
          200, '#41b6c4',
          1000, '#2c7fb8',
          2000, '#253494'
        ],
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1.5,
        'circle-opacity': 0.85
      }
    });
    
  };// 添加 toxic-1 图层
window.addToxicFacilitiesLayer = function () {
  if (!map.getSource('toxic-1')) {
    map.addSource('toxic-1', {
      type: 'geojson',
      data: './data_set/selected_Toxics_Release_Inventory_Facilities.geojson'
    });
  }
  if (!map.hasImage('toxics-icon')) {
    map.loadImage('./icon/selected_Toxics_Release_Inventory_Facilities.png', (error, image) => {
      if (error) throw error;
      map.addImage('toxics-icon', image);
      map.addLayer({
        id: 'toxic-1',
        type: 'symbol',
        source: 'toxic-1',
        layout: {
          'icon-image': 'toxics-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    });
  } else {
    if (!map.getLayer('toxic-1')) {
      map.addLayer({
        id: 'toxic-1',
        type: 'symbol',
        source: 'toxic-1',
        layout: {
          'icon-image': 'toxics-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    }
  }
};

// 添加 toxic-2 图层
window.addHazardousLayer = function () {
  if (!map.getSource('toxic-2')) {
    map.addSource('toxic-2', {
      type: 'geojson',
      data: './data_set/selected_Hazardous_waste_material_storage.geojson'
    });
  }
  if (!map.hasImage('hazardous-icon')) {
    map.loadImage('./icon/selected_Hazardous_waste_material_storage.png', (error, image) => {
      if (error) throw error;
      map.addImage('hazardous-icon', image);
      map.addLayer({
        id: 'toxic-2',
        type: 'symbol',
        source: 'toxic-2',
        layout: {
          'icon-image': 'hazardous-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    });
  } else {
    if (!map.getLayer('toxic-2')) {
      map.addLayer({
        id: 'toxic-2',
        type: 'symbol',
        source: 'toxic-2',
        layout: {
          'icon-image': 'hazardous-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    }
  }
};

// 添加 toxic-3 图层
window.addRemediationLayer = function () {
  if (!map.getSource('toxic-3')) {
    map.addSource('toxic-3', {
      type: 'geojson',
      data: './data_set/selected_NYS_Remediation_Sites.geojson'
    });
  }
  if (!map.hasImage('remediation-icon')) {
    map.loadImage('./icon/selected_NYS_Remediation_Sites.png', (error, image) => {
      if (error) throw error;
      map.addImage('remediation-icon', image);
      map.addLayer({
        id: 'toxic-3',
        type: 'symbol',
        source: 'toxic-3',
        layout: {
          'icon-image': 'remediation-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    });
  } else {
    if (!map.getLayer('toxic-3')) {
      map.addLayer({
        id: 'toxic-3',
        type: 'symbol',
        source: 'toxic-3',
        layout: {
          'icon-image': 'remediation-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    }
  }
};

// 添加 toxic-4 图层
window.addOerLayer = function () {
  if (!map.getSource('toxic-4')) {
    map.addSource('toxic-4', {
      type: 'geojson',
      data: './data_set/selected_OER_Cleanup_Sites.geojson'
    });
  }
  if (!map.hasImage('oer-icon')) {
    map.loadImage('./icon/selected_OER_Cleanup_Sites.png', (error, image) => {
      if (error) throw error;
      map.addImage('oer-icon', image);
      map.addLayer({
        id: 'toxic-4',
        type: 'symbol',
        source: 'toxic-4',
        layout: {
          'icon-image': 'oer-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    });
  } else {
    if (!map.getLayer('toxic-4')) {
      map.addLayer({
        id: 'toxic-4',
        type: 'symbol',
        source: 'toxic-4',
        layout: {
          'icon-image': 'oer-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    }
  }
};

// 添加 toxic-5 图层
window.addSolidWasteLayer = function () {
  if (!map.getSource('toxic-5')) {
    map.addSource('toxic-5', {
      type: 'geojson',
      data: './data_set/selected_solid_waste_management.geojson'
    });
  }
  if (!map.hasImage('solidwaste-icon')) {
    map.loadImage('./icon/selected_solid_waste_management.png', (error, image) => {
      if (error) throw error;
      map.addImage('solidwaste-icon', image);
      map.addLayer({
        id: 'toxic-5',
        type: 'symbol',
        source: 'toxic-5',
        layout: {
          'icon-image': 'solidwaste-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    });
  } else {
    if (!map.getLayer('toxic-5')) {
      map.addLayer({
        id: 'toxic-5',
        type: 'symbol',
        source: 'toxic-5',
        layout: {
          'icon-image': 'solidwaste-icon',
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
      });
    }
  }
};



  
  
  
  
  
  
  window.removeToxicFacilitiesLayer = function () {
    if (map.getLayer('toxic-1')) map.removeLayer('toxic-1');
    if (map.getSource('toxic-1')) map.removeSource('toxic-1');
  };
  
  window.removeHazardousLayer = function () {
    if (map.getLayer('toxic-2')) map.removeLayer('toxic-2');
    if (map.getSource('toxic-2')) map.removeSource('toxic-2');
  };
  
  window.removeRemediationLayer = function () {
    if (map.getLayer('toxic-3')) map.removeLayer('toxic-3');
    if (map.getSource('toxic-3')) map.removeSource('toxic-3');
  };
  
  window.removeOerLayer = function () {
    if (map.getLayer('toxic-4')) map.removeLayer('toxic-4');
    if (map.getSource('toxic-4')) map.removeSource('toxic-4');
  };
  
  window.removeSolidWasteLayer = function () {
    if (map.getLayer('toxic-5')) map.removeLayer('toxic-5');
    if (map.getSource('toxic-5')) map.removeSource('toxic-5');
  };
  

      let hoverPopup = null;
 window.enableToxicHoverPopups = function () {
  map.on('mousemove', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['toxic-1', 'toxic-2', 'toxic-3', 'toxic-4', 'toxic-5']
    });
    if (features.length > 0) {
      map.getCanvas().style.cursor = 'pointer';
      const f = features[0];
      console.log('feature:', f);
      console.log('feature properties:', f.properties);


      let popupContent = '';

      if (f.layer.id === 'toxic-1') {
        // Toxics Release Facilities
        const facility = f.properties['4. FACILITY NAME'] || 'Unknown Facility';
        const chemical = f.properties['37. CHEMICAL'] || 'Unknown Chemical';
        const releases = f.properties['107. TOTAL RELEASES'] || 'Unknown Total Releases';
        popupContent = `<strong>${facility}</strong><br/>Chemical: ${chemical}<br/>Total Releases: ${releases}`;
        
      }
      else if (f.layer.id === 'toxic-2') {
        // Hazardous Waste Storage
        const facility = f.properties['HANDLER NA'] || 'Unknown Facility';
        const wasteType = f.properties['DESCRIPTIO'] || 'Unknown Waste Type';
        const storage = f.properties['GENERATION'] || 'Unknown Storage Amount';
        popupContent = `<strong>${facility}</strong><br/>Waste Type: ${wasteType}<br/>Storage Amount: ${storage} tons`;
        
      }
      else if (f.layer.id === 'toxic-3') {
        // NYS Remediation Sites
        const siteName = f.properties['program_facility_name'] || 'Unknown Site Name';
        const address = f.properties['address1'] || 'Unknown Address';
        const siteId = f.properties['program_number'] || 'Unknown Site ID';
        popupContent = `<strong>${siteName}</strong><br/>Address: ${address}<br/>Site ID: ${siteId}`;
        
      }
      else if (f.layer.id === 'toxic-4') {
        // OER Cleanup Sites
        const siteName = f.properties['Project Name'] || 'Unknown Site Name';
        const address = (f.properties['Street Number'] || '') + ' ' + (f.properties['Street Name'] || 'Unknown Address');
        const cleanupAction = f.properties['OER Program'] || 'Unknown Cleanup Action';
        popupContent = `<strong>${siteName}</strong><br/>Address: ${address}<br/>Cleanup Action: ${cleanupAction}`;
        
      }
      else if (f.layer.id === 'toxic-5') {
        // Solid Waste Management
        const facility = f.properties['facname'] || 'Unknown Facility';
        const wasteType = f.properties['facsubgrp'] || 'Unknown Waste Type';
        const volume = f.properties['capacity'] !== undefined ? f.properties['capacity'] : 'Unknown Volume';
        popupContent = `<strong>${facility}</strong><br/>Waste Type: ${wasteType}<br/>Volume: ${volume}`;
        
      }

      if (hoverPopup) hoverPopup.remove();
      hoverPopup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
        .setLngLat(f.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map);

    } else {
      map.getCanvas().style.cursor = '';
      if (hoverPopup) hoverPopup.remove();
    }
  });

  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': 'rgb (255, 255, 255)',
      'fill-extrusion-height': [
        "interpolate", ["linear"], ["zoom"],
        15, 0,
        15.05, ["get", "height"]
      ],
      'fill-extrusion-base': [
        "interpolate", ["linear"], ["zoom"],
        15, 0,
        15.05, ["get", "min_height"]
      ],
      'fill-extrusion-opacity': 0.8
    }
  });
  
  window.addFloodingLayer = function () {
    console.log('✅ addFloodingLayer triggered');

    if (!map.getSource('flooding-zone')) {
        map.addSource('flooding-zone', {
            type: 'geojson',
            data: './data_set/2050s_100-year_Floodplain.geojson'
        });

        map.addLayer({
            id: 'flooding-zone-layer',
            type: 'fill',
            source: 'flooding-zone',
            paint: {
                'fill-color': 'rgb(24, 102, 117)',
                'fill-opacity': 0,  // 起始透明度设为0
                'fill-outline-color': '#f9f9f9'
            }
        } , 'flushing-creek-fill');  // 插在 creek 图层之上

        // 动态渐显 fill-opacity
        let opacity = 0;
        const targetOpacity = 0.5;  // 最后要到1
        const step = 0.05;         // 每次增加的透明度
        const interval = setInterval(() => {
            opacity += step;
            if (opacity >= targetOpacity) {
                opacity = targetOpacity;
                clearInterval(interval);
            }
            map.setPaintProperty('flooding-zone-layer', 'fill-opacity', opacity);
        }, 10);  // 每30ms加一点点
    }
  };




 window.hideFloodingLayer = function () {
   console.log('✅ hideFloodingLayer triggered');
 
   if (map.getLayer('flooding-zone-layer')) {
       let opacity = 0.5;
       const step = 0.05;
       const interval = setInterval(() => {
           opacity -= step;
           if (opacity <= 0) {
               opacity = 0;
               clearInterval(interval);
 
               // 渐隐完成后真正移除图层和source
               map.removeLayer('flooding-zone-layer');
               if (map.getSource('flooding-zone')) {
                   map.removeSource('flooding-zone');
               }
           }
           map.setPaintProperty('flooding-zone-layer', 'fill-opacity', opacity);
       }, 10);
   } else if (map.getSource('flooding-zone')) {
       map.removeSource('flooding-zone');
   }
  }; 


  window.addFloodVulnerabilityLayer_20250429 = function () {
    console.log('addFloodVulnerabilityLayer_20250429 triggered');

    if (!map.getSource('flood-vulnerability-20250429')) {
        map.addSource('flood-vulnerability-20250429', {
            type: 'geojson',
            data: './data_set/New_York_City_Flood_Vulnerability_Index_20250429.geojson'
        });

        map.addLayer({
            id: 'flood-vulnerability-20250429-layer',
            type: 'fill',
            source: 'flood-vulnerability-20250429',
            paint: {
                'fill-color': [
                    'step',
                    ['to-number', ['get', 'tid_80s'], 0],
                    'rgb(145, 205, 239)', 1,
                    'rgb(60, 127, 190)', 3,
                    'rgb(24, 65, 153)', 5,
                    'rgb(12, 36, 122)', 7,
                    'rgb(5, 22, 79)'
                ],
                'fill-opacity': 1,
                'fill-outline-color': '#f9f9f9'
            }
        }, 'flooding-zone-layer');

        // 动态渐显 fill-opacity
        let opacity = 0;
        const targetOpacity = 0.6;
        const step = 0.05;
        const interval = setInterval(() => {
            opacity += step;
            if (opacity >= targetOpacity) {
                opacity = targetOpacity;
                clearInterval(interval);
            }
            map.setPaintProperty('flood-vulnerability-20250429-layer', 'fill-opacity', opacity);
        }, 10);
    }
  };

  window.hideFloodVulnerabilityLayer_20250429 = function () {
    console.log('hideFloodVulnerabilityLayer_20250429 triggered');

    if (map.getLayer('flood-vulnerability-20250429-layer')) {
        let opacity = 0.6;
        const step = 0.05;
        const interval = setInterval(() => {
            opacity -= step;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(interval);

                // 移除图层和 source
                map.removeLayer('flood-vulnerability-20250429-layer');
                if (map.getSource('flood-vulnerability-20250429')) {
                    map.removeSource('flood-vulnerability-20250429');
                }
                console.log('🗑️ flood-vulnerability-20250429 图层与数据源已移除');
            } else {
                map.setPaintProperty('flood-vulnerability-20250429-layer', 'fill-opacity', opacity);
            }
        }, 10);
    } else if (map.getSource('flood-vulnerability-20250429')) {
        map.removeSource('flood-vulnerability-20250429');
        console.log(' 图层不存在，仅移除 source');
    }
  };





  
  







 };

 window.disableToxicHoverPopups = function () {
   map.off('mousemove');
   if (hoverPopup) hoverPopup.remove();
 };

  
  
  

  


};




window.showWaterQualityLayer = function () {
  if (map.getLayer('water-quality-layer')) {
    map.setLayoutProperty('water-quality-layer', 'visibility', 'visible');
  }
};

window.hideWaterQualityLayer = function () {
  if (map.getLayer('water-quality-layer')) {
    map.setLayoutProperty('water-quality-layer', 'visibility', 'none');
  }
};


const waterMarkers = [];

window.hideWaterQualityLayer = function () {
  if (map.getLayer('water-quality-layer')) {
    map.setLayoutProperty('water-quality-layer', 'visibility', 'none');
  }
};

const waterCalloutLayout = [
  {
    site_name: "Flushing Meadows Corona Park- Meadow Lake",
    top: "37%",
    left: "78%"
  },
  {
    site_name: "Flushing Meadows Corona Park- Willow Lake",
    top: "60%",
    left: "63%" 
  },
  {
    site_name: "Flushing Creek",
    bottom: "42%",
    left: "60%"
  },
  {
    site_name: "Flushing Meadows- Flushing Bay, World's Fair Marina boat ramp",
    bottom: "45%", 
    left: "28%" 
  },
  {
    site_name: "Flushing Meadows- Flushing Bay, World's Fair Marina Pier 1 east",
    bottom: "10%", 
    left: "32%" 
  },
  {
    site_name: "Flushing Meadows- Flushing Bay, World's Fair Marina Pier 1 west",
    bottom: "30%",  
    left: "12%"  
  }
];

window.showWaterQualityCallouts = function () {
  if (!map.getSource("water-quality")) return;

  map.on("sourcedata", function waitForSource(e) {
    if (
      e.sourceId === "water-quality" &&
      e.isSourceLoaded &&
      map.querySourceFeatures("water-quality").length > 0
    ) {
      map.off("sourcedata", waitForSource);
      renderWaterCallouts();
    }
  });
};

window.hideWaterQualityMarkers = function () {
  waterCalloutElements.forEach(el => el.remove());
  waterCalloutElements.length = 0;

  // 清除虚线和点
  if (map.getLayer("water-line-layer")) map.removeLayer("water-line-layer");
  if (map.getSource("water-line-source")) map.removeSource("water-line-source");
  

};



function drawCalloutLinesAndPoints(layout, idPrefix, className, lineColor, pointColor) {
  const features = [];
  const points = [];

  layout.forEach((item, i) => {
    const boxId = `${idPrefix}${i}`;
    const el = document.getElementById(boxId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const mapRect = map.getContainer().getBoundingClientRect();
    const screenCenter = [
      rect.left + rect.width / 2 - mapRect.left,
      rect.top + rect.height / 2 - mapRect.top
    ];
    const geoCoord = map.unproject(screenCenter);

    const lng = parseFloat(el.dataset.lng);
    const lat = parseFloat(el.dataset.lat);
    const mapCoord = [lng, lat];

    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [geoCoord.lng, geoCoord.lat],
          mapCoord
        ]
      }
    });

    points.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: mapCoord
      }
    });
  });

  const lineId = `${className}-layer`;
  const sourceId = `${className}-source`;

  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features }
    });
    map.addLayer({
      id: lineId,
      type: 'line',
      source: sourceId,
      layout: { 'line-cap': 'round' },
      paint: {
        'line-color': lineColor || '#666',
        'line-opacity': 0.8,
        'line-width': 1.2,
        'line-dasharray': [2, 2]
      }
    });
  } else {
    map.getSource(sourceId).setData({ type: 'FeatureCollection', features });
  }

  const pointId = `${className}-points`;
  if (!map.getSource(pointId)) {
    map.addSource(pointId, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: points }
    });
    map.addLayer({
      id: pointId,
      type: 'circle',
      source: pointId,
      paint: {
        'circle-radius': 5,
        'circle-color': pointColor || '#ff6600',
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1
      }
    });
  } else {
    map.getSource(pointId).setData({ type: 'FeatureCollection', features: points });
  }
}

// ✅ 绘制虚线连接（不画圆点）
function drawWaterCalloutLinesOnly() {
  const features = [];

  waterCalloutLayout.forEach((item, i) => {
    const el = document.getElementById(`water-callout-${i}`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const mapRect = map.getContainer().getBoundingClientRect();
    const screenCenter = [
      rect.left + rect.width / 2 - mapRect.left,
      rect.top + rect.height / 2 - mapRect.top
    ];
    const boxCoord = map.unproject(screenCenter);

    const lng = parseFloat(el.dataset.lng);
    const lat = parseFloat(el.dataset.lat);

    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [boxCoord.lng, boxCoord.lat],
          [lng, lat]
        ]
      }
    });
  });

  if (!map.getSource("water-line-source")) {
    map.addSource("water-line-source", {
      type: "geojson",
      data: { type: "FeatureCollection", features }
    });

    map.addLayer({
      id: "water-line-layer",
      type: "line",
      source: "water-line-source",
      paint: {
        "line-color": "#0077be",
        "line-width": 1.5,
        "line-opacity": 0.85,
        "line-dasharray": [2, 2]
      }
    });
  } else {
    map.getSource("water-line-source").setData({
      type: "FeatureCollection",
      features
    });
  }
}

// ✅ 绑定移动时更新位置
function refreshWaterLinesOnly() {
  drawWaterCalloutLinesOnly();
}


const waterCalloutElements = [];
const waterCalloutLines = [];

// ✅ 渲染水质 callout 与虚线（不显示点）
function renderWaterCallouts() {
  const features = map.querySourceFeatures("water-quality");
  const container = document.getElementById("map");

  waterCalloutLayout.forEach((item, i) => {
    const match = features.find(f => f.properties.site_name === item.site_name);
    if (!match) return;

    const p = match.properties;
    const coords = match.geometry.coordinates;

    const box = document.createElement("div");
    box.className = "callout-box fixed-callout water-callout";
    box.id = `water-callout-${i}`;
    box.dataset.lng = coords[0];
    box.dataset.lat = coords[1];
    box.innerHTML = `
    <h4>${p.site_name}</h4>
    <p>Acceptable Enterococcus Count (0–60) <br>
       Anual Average Enterococcus Count: ${p.geomean}<br>
       Historical Max Enterococcus Count: ${p.maximum}<br>
       Enterococcus Count: ${p.specimen_count}<br>
       Date: ${p.sample_date}</p>
  `;
  
  const img = document.createElement("img");
  img.className = "chart-img";
  
  if (p.site_name.includes("Meadow Lake")) {
    img.src = "img/Flushing_Meadows_Corona_Park-_Meadow_Lake.png";
  } else if (p.site_name.includes("Willow Lake")) {
    img.src = "img/Flushing_Meadows_Corona_Park-_Willow_Lake.png";
  } else if (p.site_name.includes("Flushing Bay, World's Fair Marina boat ramp")) {
    img.src = "img/Flushing_Meadows-_Flushing_Bay_Worlds_Fair_Marina_boat_ramp.png";
  } else if (p.site_name.includes("Flushing Bay, World's Fair Marina Pier 1 east")) {
    img.src = "img/Flushing_Meadows-_Flushing_Bay_Worlds_Fair_Marina_Pier_1_east.png";
  } else if (p.site_name.includes("Flushing Bay, World's Fair Marina Pier 1 west")) {
    img.src = "img/Flushing_Meadows_-_Flushing_Bay.png";
  } else if (p.site_name.includes("Flushing Bay")) {
    img.src = "img/Flushing_Meadows_-_Flushing_Bay.png";
  } else if (p.site_name.includes("Flushing Creek")) {
    img.src = "img/Flushing_Creek.png";
  }
  
  img.alt = `${p.site_name} Chart`;
  box.appendChild(img);
  




    if (item.top) box.style.top = item.top;
    if (item.left) box.style.left = item.left;
    if (item.right) box.style.right = item.right;
    if (item.bottom) box.style.bottom = item.bottom;

    container.appendChild(box);
    box.classList.add("show");
    waterCalloutElements.push(box);
  });

  drawWaterCalloutLinesOnly();
  map.on("move", refreshWaterLinesOnly);
}






function updateWaterCalloutPositions() {
  waterCalloutElements.forEach(el => {
    const [lng, lat] = el.getAttribute("data-coord").split(",").map(Number);
    const pos = map.project([lng, lat]);
    el.style.left = `${pos.x}px`;
    el.style.top = `${pos.y}px`;
  });
}

function updateWaterCalloutLines() {
  waterCalloutLines.forEach(line => {
    const lng = parseFloat(line.dataset.lng);
    const lat = parseFloat(line.dataset.lat);
    const targetId = line.dataset.targetId;
    const target = document.getElementById(targetId);
    if (!target) return;

    const mapPos = map.project([lng, lat]);
    const boxRect = target.getBoundingClientRect();
    const mapRect = map.getBoundingClientRect();
    const boxX = boxRect.left + boxRect.width / 2 - mapRect.left;
    const boxY = boxRect.top + boxRect.height / 2 - mapRect.top;

    const x1 = mapPos.x;
    const y1 = mapPos.y;
    const x2 = boxX;
    const y2 = boxY;
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    line.style.width = `${length}px`;
    line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
  });
}

  



});

const calloutPollutedData = [
  {
    id: "polluted1",
    title: "Flushign Creek Industrial Zone",
    img: "./img/flushing creek overview pollution1.jpg",
    text: "Industrial runoff collects here after rain.",
    coords: [-73.8397209, 40.7669506], // ✅ 已修正
    top: "22%",
    left: "25%"
  },
  {
    id: "polluted2",
    title: "Contaminated Ground - Iron Triangle",
    img: "./img/flushing creek overview pollution2.jpg",
    text: "Often cited in EPA documents as high-risk zone.",
    coords: [-73.8414251, 40.7588559], // ✅ 已修正
    top: "60%",
    left: "23%"
  },
  {
    id: "polluted3",
    title: "Concerete Industry & Auto Shop",
    img: "./img/flushing creek overview pollution3.png",
    text: "Heavy metal soil risk.",
    coords: [-73.8369692, 40.7592496], // ✅ 已修正
    top: "60%",
    right: "25%"
  },
  {
    id: "polluted4",
    title: "Willets Point Construction Site",
    img: "./img/flushing creek overview pollution4.png",
    text: "Former landfill now leaking into the creek.",
    coords: [-73.8399465, 40.757885], // ✅ 已修正
    bottom: "45%",
    right: "30%"
  },
  {
    id: "polluted5",
    title: " ",
    img: "./img/vulnerability score legend.png",
    text: "The darker the color, the more contaminated it is.",
    coords: [-73.8399465, 40.757885], // ✅ 已修正
    bottom: "5%",
    right: "5%"
  },


];

// ✅ 添加污染图层图例的静态图片方框
window.showPollutionStaticLegend = function () {
  if (document.getElementById("polluted-legend")) return; // 避免重复添加

  const legendBox = document.createElement("div");
  legendBox.className = "callout-box fixed-callout";
  legendBox.id = "polluted-legend";
  legendBox.style.bottom = "12%";
  legendBox.style.right = "5%";
  legendBox.innerHTML = `
    <img src="./img/vulnerability score legend.png" style="width:160px; display:block; margin-bottom:0.5em;" />
    <p style="margin:0; font-size:0.9em;">Deeper color, more serious in water pollution.</p>
  `;
  document.getElementById("map").appendChild(legendBox);
};

window.hidePollutionStaticLegend = function () {
  const el = document.getElementById("polluted-legend");
  if (el) el.remove();
};


window.showPollutionLayer = function () {
  if (map.getLayer('polluted-zone-layer')) {
    map.setPaintProperty('polluted-zone-layer', 'fill-opacity', 0.5);
  }
};

window.hidePollutionLayer = function () {
  if (map.getLayer('polluted-zone-layer')) {
    map.setPaintProperty('polluted-zone-layer', 'fill-opacity', 0);
  }
};

window.showPollutionLegend = function () {
  map.once("moveend", () => {
    const legend = document.getElementById("pollution-legend");
    if (legend) {
      legend.style.zIndex = 9999;
      legend.classList.add("show");
    }
  });
};


window.hidePollutionLegend = function () {
  const legend = document.getElementById("pollution-legend");
  if (legend) {
    legend.classList.remove("show");
  }
};




window.showPollutionCallouts = function () {
  const container = document.getElementById("map");
  calloutPollutedData.forEach(item => {
    const box = document.createElement("div");
    box.className = "callout-box fixed-callout";
    box.setAttribute("id", item.id);
    box.innerHTML = `
      <h4>${item.title}</h4>
      <img src="${item.img}" />
      <p>${item.text}</p>
    `;

    if (item.top) box.style.top = item.top;
    if (item.left) box.style.left = item.left;
    if (item.right) box.style.right = item.right;
    if (item.bottom) box.style.bottom = item.bottom;

    container.appendChild(box);
    setTimeout(() => box.classList.add("show"), 50);
  });

  setTimeout(() => drawCalloutLinesAndPoints(calloutPollutedData), 600);
};

window.hidePollutionCallouts = function () {
  calloutPollutedData.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 800);
    }
  });

  if (map.getLayer('callout-lines-layer')) map.removeLayer('callout-lines-layer');
  if (map.getSource('callout-lines')) map.removeSource('callout-lines');
  if (map.getLayer('callout-point-layer')) map.removeLayer('callout-point-layer');
  if (map.getSource('callout-points')) map.removeSource('callout-points');
};

// ✅ 水质 callout 专属绘图函数（虚线 + 圆点）
function drawWaterLinesAndPoints() {
  const features = [];
  const points = [];

  waterCalloutLayout.forEach((item, i) => {
    const el = document.getElementById(`water-callout-${i}`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const mapRect = map.getContainer().getBoundingClientRect();
    const screenCenter = [
      rect.left + rect.width / 2 - mapRect.left,
      rect.top + rect.height / 2 - mapRect.top
    ];
    const geoCoord = map.unproject(screenCenter);
    const lng = parseFloat(el.dataset.lng);
    const lat = parseFloat(el.dataset.lat);

    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [geoCoord.lng, geoCoord.lat],
          [lng, lat]
        ]
      }
    });

    points.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    });
  });

  // 添加或更新虚线
  if (!map.getSource('water-line-source')) {
    map.addSource('water-line-source', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features }
    });
    map.addLayer({
      id: 'water-line-layer',
      type: 'line',
      source: 'water-line-source',
      paint: {
        'line-color': '#0077be',
        'line-width': 1.5,
        'line-opacity': 0.8,
        'line-dasharray': [2, 2]
      }
    });
  } else {
    map.getSource('water-line-source').setData({ type: 'FeatureCollection', features });
  }

  // 添加或更新点
  if (!map.getSource('water-line-points')) {
    map.addSource('water-line-points', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: points }
    });
    map.addLayer({
      id: 'water-line-points',
      type: 'circle',
      source: 'water-line-points',
      paint: {
        'circle-radius': 5,
        'circle-color': '#0077be',
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1
      }
    });
  } else {
    map.getSource('water-line-points').setData({ type: 'FeatureCollection', features: points });
  }
}



window.showRainyChart = function () { 
  if (document.getElementById("wetdry-chart-box")) return;

  const box = document.createElement("div");
  box.id = "wetdry-chart-box";
  box.className = "floating-chart-box";
  box.innerHTML = `
    <img src="./img/wet&dry chart.png" class="chart-img" alt="Wet and Dry Chart">
  `;
  document.getElementById("map").appendChild(box);

  setTimeout(() => box.classList.add("show"), 100);
};

window.hideRainyChart = function () {
  const box = document.getElementById("wetdry-chart-box");
  if (box) {
    box.classList.remove("show");
    setTimeout(() => box.remove(), 600);
  }
};



window.showFloatingTextBox = function () {
  const box = document.getElementById("floating-text-box");
  if (box) box.classList.add("show");
};

window.hideFloatingTextBox = function () {
  const box = document.getElementById("floating-text-box");
  if (box) box.classList.remove("show");
};

window.highlightCreekRed = function () {
  if (map.getLayer('flushing-creek-fill')) {
    map.setPaintProperty('flushing-creek-fill', 'fill-color', '#f4aaaa'); // 淡红色
  }
};

window.highlightCreekdeepblue = function () {
  if (map.getLayer('flushing-creek-fill')) {
    map.setPaintProperty('flushing-creek-fill', 'fill-color', 'rgb(6, 76, 84)'); // 淡红色
  }
};

window.resetCreekFill = function () {
  if (map.getLayer('flushing-creek-fill')) {
    map.setPaintProperty('flushing-creek-fill', 'fill-color', '#a8dadc'); // 原始蓝色
  }
};

window.showToxicLegend = function () {
  console.log('showToxicLegend triggered');
  const legend = document.getElementById('sources-legend');
  if (legend) {
    legend.style.display = 'block';
    legend.style.opacity = '1';
    legend.style.visibility = 'visible';
  } else {
    console.error('sources-legend NOT found');
  }
};



window.hideToxicLegend = function () {
  document.getElementById('sources-legend').style.display = 'none';
};








