const config = [
    {
      id: "flushing-creek-intro",
      alignment: "center",
      title: "TOXIC WATER",
      description: `
        <p style="text-align:center; font-size:1.2em; margin-top:30vh;">
          Welcome to Flushing Creek<br>
          A story of hidden pollution beneath beauty.
        </p>
        <p style="text-align:center;">Scroll to begin ↓</p>
      `,
      location: {
        center: [-73.840, 40.747],
        zoom: 14,
        pitch: 30,
        bearing: 0
      },
      onChapterEnter: [
        { callback: "lockMap" },
        { callback: "fadeInCover" },
        { layer: 'flushing-creek-fill', opacity: 0.6 }
        
      ],
      onChapterExit: [
        { layer: 'flushing-creek-fill', opacity: 0 },
        { callback: "fadeOutCover" }
      ]
    },
    {
      id: "geography-context",
      alignment: "center",
      title: "Geographical Context",
      description: `
      <p>This area includes Flushing, Corona, and Willets Point.</p>
      <img src="./img/LOCATION IMG1.png" class="scroll-image" alt="Flushing Area Overview">
      <div class="image-caption-box">
        <h4>Flushing Creek</h4>
        <p>Nestled between Flushing and willets point, Flushing Creek originates from Jamaica in the south and flows all the way through willow lake, 
        meadow lake into corona-meadow park, and finally through the junction of willets point and Flushing into Flushing Bay, where it joins the East River. .</p>
      </div>
    `,
          location: {
        center: [-73.838, 40.745],
        zoom: 11.86,
        pitch: 0,
        bearing: 0
      },
      onChapterEnter: [
        { layer: 'flushing-creek-fill', opacity: 0.6 },  
        { callback: "revealStoryPanel" }
      ],
      onChapterExit: []
    },
    {
      id: "ecological-memory",
      alignment: "center",
      title: "Ecological Memory",
      description: `
        <div class="section-title">It used to be rich in <span class="wetlands">Wetlands & Greenery</span>. </div>

      `,

      onChapterEnter: [
        { callback: "addGreenLayer" },
        { callback: "showGreenLayer" },
        { callback: "showLegend" },
        { callback: "showCallouts" },
        { callback: "addHighlightOverlayLayer" },
        { callback: "showHighlightOverlay" },
      ],
      onChapterExit: [
        { callback: "hideLegend" },
        { callback: "hideCallouts" },
        { callback: "hideGreenLayer" },
        { callback: "hideHighlightOverlay" },
      ]
    },
    
    {
  id: "polluted-present",
  alignment: "center",
  title: "Present Day Pollution",
  description: `
    <div class="section-title">But now is <span class="polluted-red">highly polluted.</span></div>

  `,
  location: {
    center: [-73.838, 40.745],
    zoom: 11.86,
    pitch: 0,
    bearing: 0
  },
  onChapterEnter: [
    { callback: "hideHighlightOverlay" },   // ✅ 隐藏第三章 highlight
    { callback: "addPollutionLayer" },
    { callback: "showPollutionLayer" },
    { callback: "showPollutionCallouts" },
    { callback: "showPollutionStaticLegend" },
  ],
  onChapterExit: [
    { callback: "hidePollutionLayer" },
    { callback: "hidePollutionCallouts" },
    { callback: "hidePollutionStaticLegend" },

  ]
 },

 {
  id: "water-quality-overview",
  alignment: "center",
  title: "Water Quality Sampling",
  description: `  
    <div class="section-title">The number of<span class="Enterococcus">Enterococcus</span> in the water severely exceeding the standard line (passing standard ≤ 60) .</div>
     
    
  `,
  location: {
    center: [-73.8385, 40.7448],
    zoom: 13.5,
    pitch: 0,
    bearing: 0
  },
  onChapterEnter: [
    { callback: "addWaterQualityLayer" },
    { callback: "showWaterQualityLayer" },
    { callback: "showWaterQualityCallouts" },
    { callback: "showWaterLegend" }
  ],
  onChapterExit: [
    { callback: "hideWaterQualityMarkers" },
    { callback: "hideWaterLegend" },
    { callback: "hideWaterQualityLayer" },
    { callback: "hideWaterQualityCallouts" },


  ]
  
 },

 {
  id: "rainy-day-water-chart",
  alignment: "center",
  title: "Rainy day & Dry day Specimen Count",
  description: `  
    <div class="section-title">And if the weather is rainy, <span class="Enterococcus">it will get WORSE</span> in the water.</div>

  `,
  location: {
    center: [-73.8385, 40.7448],
    zoom: 13.5,
    pitch: 0,
    bearing: 0
  },
  onChapterEnter: [
    { callback: "showRainyChart" },
    { callback: "showFloatingTextBox" },
    { callback: "resetCreekFill"},
  ],
  onChapterExit: [
    { callback: "hideRainyChart" },
    { callback: "hideFloatingTextBox" },

  ]
 },
 {
  id: "creek-red-transition",
  alignment: "center",
  title: "What has led to this ?",
  description: `  
    <div class="what-led-title">
    <br>+ Crisis +</br>
    <br>+ What Led to This ? +</br>
    <br>+ Pollution +</br>
    </div>

  `,
  location: {
    center: [-73.8385, 40.7448],
    zoom: 11,
    pitch: 0,
    bearing: 0
  },
  onChapterEnter: [
    {
      layer: "flushing-creek-fill",
      opacity: 1
    },
    {
      callback: "highlightCreekRed"
    },

  ],
  onChapterExit: [



  ]
 },
 {
  id: "let's-take-a-walk",
  alignment: "center",
  title: "let's-take-a-walk",
  description: `  
    <div class="what-led-title">
    <br>+ Let's zoom in to take a look +</br>
    </div>

  `,
  location: {
    center: [-73.8385, 40.7448],
    zoom: 11,
    pitch: 0,
    bearing: 0
  },
  onChapterEnter: [
    {
      layer: "flushing-creek-fill",
      opacity: 1
    },
    {
      callback: "highlightCreekRed"
    },

  ],
  onChapterExit: [
    {
      callback: "resetCreekFill"
    },


  ]
 },
 {
  id: "CHAPTER-1",
  alignment: "center",
  title: "South Flushing Meadow",
  description: `  
    <div class="left3-textbox">
     <h2>+ Cumulative Industrial Impacts</h2>
      <img src="img/chaptertextbox/textone.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />
      <p>South Flushing Creek is heavily polluted by runoff from the DOT train yard, combined sewer overflows, and industrial waste from nearby facilities.</p >
    </div>,


  `,
  location: {
    center: [-73.8332419, 40.726174],
    zoom: 15,
    pitch: 0,
    bearing: 75
  },
  onChapterEnter: [
    { callback: "addchapterone" },
    { callback: "showchapterone" },
    { layer: "flushing-creek-fill", opacity: 0.5 },
    { callback: "highlightCreekRed" }
  ],
  onChapterExit: [
    { callback: "hidechapterone" },
  ]
 },
 {
  id: "CHAPTER-2",
  alignment: "center",
  title: "South Flushing Meadow",
  description: `  
    <div class="left3-textbox">
     <h2>+ Train Maintenance Runoff</h2>
      <img src="img/chaptertextbox/texttwo.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />
      <p>Pollution in Flushing Creek near the Corona Yard comes from stormwater runoff carrying oil, metals, and chemicals from train maintenance, drainage outfalls, and nearby roadways.</p>
    </div>,

  `,
  location: {
    center: [-73.8409427, 40.7555802],
    zoom: 15,
    pitch: 0,
    bearing: 90
  },
  onChapterEnter: [
    { callback: "addchaptertwo" },
    { callback: "showchaptertwo" },
    { layer: "flushing-creek-fill", opacity: 0.5 },
    { callback: "highlightCreekRed" }
  ],
  onChapterExit: [
    { callback: "hidechaptertwo" },
  ]
 },
 {
  id: "CHAPTER-3",
  alignment: "center",
  title: "South Flushing Meadow",
  description: `  
    <div class="left3-textbox">
      <h2>+ Waste Debris and Runoff</h2>
      <img src="img/chaptertextbox/textthree.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />
      <p>Pollution comes from wind-blown debris, contaminated runoff from exposed waste piles, and unpaved surfaces that channel industrial residue directly into the creek.</p>
     </div>,

  `,
  location: {
    center: [-73.8415036, 40.7637719],
    zoom: 15,
    pitch: 0,
    bearing: 105
  },
  onChapterEnter: [
    { callback: "addchapterthree" },
    { callback: "showchapterthree" },
    { layer: "flushing-creek-fill", opacity: 0.5 },
    { callback: "highlightCreekRed" }
  ],
  onChapterExit: [
    { callback: "hidechapterthree" },
  ]
 },
 {
  id: "CHAPTER-4",
  alignment: "center",
  title: "South Flushing Meadow",
  description: `  
    <div class="left3-textbox">
      <h2>+ Heavy Truck Pollution</h2>
      <img src="img/chaptertextbox/textfour.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />
      <p>Pollution comes from runoff carrying dust, diesel residue, and crushed materials from unpaved surfaces and heavy truck operations lacking ecological buffers.</p >
    </div>,

  `,
  location: {
    center: [-73.8442679, 40.7681918],
    zoom: 15,
    pitch: 0,
    bearing: 105
  },
  onChapterEnter: [
    { callback: "addchapterfour" },
    { callback: "showchapterfour" },
    { layer: "flushing-creek-fill", opacity: 0.5 },
    { callback: "highlightCreekRed" },
    { callback: "removeToxicFacilitiesLayer" },
    { callback: "removeHazardousLayer" },
    { callback: "removeRemediationLayer" },
    { callback: "removeOerLayer" },
    { callback: "removeSolidWasteLayer" },
  ],
  onChapterExit: [
    { callback: "hidechapterfour" },
  ]
 },

  {
    id: "sources-of-waste",
    alignment: "center",
    title: "Sources of Waste",
    description: `
    <div class="left-textbox">
      <h2>+ Sources of Waste</h2>
      <img src="./img/collage1.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />

      <p>There are different kinds of sources of waste as known as environmental thread in Flushing Creek area.</p>
      <p1>Hover over each icon to learn more about the types and sources of waste.</p1>
      
    </div>
      
    <div id="sources-legend" class="floating-legend-box" style="display:none;">
      <img src="./img/legend(waste+floodplain+vulnerability).png" alt="Sources of Waste Legend" />
    </div>`,
  
    location: {
      center: [-73.840, 40.7481296],
      zoom: 12.8,
      pitch: 0,
      bearing: 0
    },
    onChapterEnter: [
      { callback: "addToxicFacilitiesLayer" },  
      { callback: "addHazardousLayer" },
      { callback: "addRemediationLayer" },
      { callback: "addOerLayer" },
      { callback: "addSolidWasteLayer" },
      { callback: "showToxicLegend" },
      { callback: "showToxicTextbox" },
      { callback: "enableToxicHoverPopups" },
      { callback: "highlightCreekRed"},
      
    ],
    onChapterExit: [

      { callback: "hideToxicLegend" },
      { callback: "hideToxicTextbox" },
      { callback: "disableToxicHoverPopups" },


    ]
    
    
  },
  {
    id: "pin-chart",
    alignment: "center",
    title: "pin-chart",
    description: `
    <div class="center0-textbox">
     <h2>+ The Environmental Thread in Flushing Creek Area +</h2>
      <img src="./chart/environmental_site_piecharts.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />

     <p>+ Toxic Sites in NYC: A Closer Look at Five Major Pollution Sources +<br>

     A new visual breakdown of environmentally hazardous sites in New York City reveals that threats to public health remain widespread and diverse. Most remediation sites are still classified as high-risk, with cleanup efforts ongoing across the city. Hazardous waste storage is dominated by flammable and lead-based materials, while a large share of solid waste facilities are transfer stations and landfills, reflecting ongoing pressure on the city’s waste infrastructure.

     The majority of cleanup projects fall under voluntary and brownfield programs—showing how much the city relies on private developers to clean up polluted land. Meanwhile, just a handful of toxic chemicals make up the bulk of reported emissions from industrial sites, pointing to clear targets for regulation.

     These findings highlight the need for focused environmental policy, continued remediation investment, and stronger oversight of industrial pollutants.<br>
     The Data source is from <a href="https://experience.arcgis.com/experience/6a3da7b920f248af961554bdf01d668b/page/Data-Explorer">EJNYC Full Data Explorer</a>.</p>
    

    

    </div>`,


  
    location: {
      center: [-73.840, 40.7481296],
      zoom: 12.8,
      pitch: 0,
      bearing: 0
    },
    onChapterEnter: [


      {
        callback: "highlightCreekRed"
      },





      
    ],
    onChapterExit: [
      { callback: "resetCreekFill"},







    ]
    
    
  },
  {
    id: "what-if-sea-level-title",
    alignment: "center",
    title: "sea level rise",
    description: `
    <div class="what-if-sea-level-title">
     <br>+ What if sea level rise ? +</br>
    </div>`,


  
    location: {
      center: [-73.840, 40.7481296],
      zoom: 12.8,
      pitch: 0,
      bearing: 0
    },
    onChapterEnter: [
      { callback: "highlightCreekdeepblue" },

      { callback: "hideFloodingLayer"},





      
    ],
    onChapterExit: [







    ]
    
    
  },
  {
    id: "what-if-flooding",
    alignment: "center",
    title: "flooding",
    description: `
    <div class="what-if-flooding">
     <br>!!! It will Flush the Flushing !!!</br>
    </div>
    
    
    `,



  
    location: {
      center: [-73.840, 40.7481296],
      zoom: 12.8,
      pitch: 0,
      bearing: 0
    },
    onChapterEnter: [





      { callback: "addFloodingLayer"},


 
      
    ],
    onChapterExit: [

      { callback: "hideToxicLegend" },
      { callback: "hideToxicTextbox" },



    ]
    
    
  },
  {
    id: "flush-the flushing1",
    alignment: "center",
    title: "flush-the flushing1",
    description: `
    <div class="flush-the flushing">
     <br> </br>
    </div>,

    <div class="left-textbox">
     <h2>+ Flushing Waterfront</h2>
      <img src="./img/clocktowerwarehouseaxon.jpg" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />
      <p1> Future Flooding Scenario generated by AI</p1>

     <p>This is the Clocktower U-HAUL Warehouse which is an iconic building in Flushing Creek Waterfront. In the flood map, floodwaters will spread to the lower portion of this building.</p>
    
    </div>，
    
    <br> </br>

    <div class="left2-textbox">
     <h2>+ When the Flood is coming...</h2>
      <img src="./img/polluted1.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />
      <p1>+ Future Flooding Scenario generated by AI</p1>

     <p>'No one wants to see feces floating to their doorstep when it floods.' -- Hongyinn Ho, who has lived in Flushing for 12 years.</p>
    
    </div>`,



  
    location: {
      center: [-73.8367154, 40.7611503],
      zoom: 18,
      pitch: 65,
      bearing: 45
    },
    onChapterEnter: [



      { callback: "showToxicLegend" },
      { callback: "showToxicTextbox" },
      



 
      
    ],
    onChapterExit: [


      { callback: "hideToxicTextbox" },



    ]
    
    
  },
  {
    id: "flush-the flushing2",
    alignment: "center",
    title: "flush-the flushing2",
    description: `
    <div class="flush-the flushing">
     <br> </br>
    </div>,

    <div class="left-textbox">
     <h2>+ Willets Point</h2>
      <img src="./img/casino&stadiumaxon.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />

     <p>A former landfill site, the lot is now being developed into a high-end neighborhood of casinos, luxury housing, and a new stadium.</p>
    
    </div>

    <br> </br>

    <div class="left2-textbox">
     <h2>+ Waste water washes your life...</h2>
      <img src="./img/polluted2.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />
      <p1>+ Future Flooding Scenario generated by AI</p1>


     <p>'There is a lot of gray-area activity going on here, with developers doing a lot of things that break the bottom line of the natural environment for maximum profit.' 
     -- Minhoo Kwan, a truck driver with a load in Flushing.</p>
    
    </div>
    `,



   
    location: {
      center: [-73.8456578, 40.7565509],
      zoom: 17,
      pitch: 65,
      bearing: 350
    },
    onChapterEnter: [



      { callback: "showToxicLegend" },
      { callback: "showToxicTextbox" },


 
      
    ],
    onChapterExit: [


      { callback: "hideToxicTextbox" },



    ]
    
    
  },
  {
    id: "flush-the flushing3",
    alignment: "center",
    title: "flush-the flushing3",
    description: `
    <div class="flush-the flushing">
     <br> </br>
    </div>,

    <div class="left-textbox">
     <h2>+ USTA Billie Jean King National Tennis Center</h2>
      <img src="./img/tenniscenteraxon.jpg" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />

     <p>Huge tennis facility that's home to the US Open in late summer & public courts the rest of the year.</p>
    
    </div>
    
    <br> </br>

    <div class="left2-textbox">
     <h2>+ Sources of Waste</h2>
      <img src="./img/polluted3.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />

     <p>'We used to think the tennis courts stood for something clean and world-class, you know? Now look at it—oil slicks, trash, even old tires floating around. 
     It's like trying to play in a dump.' -- Jimmy Kim, a young tennis lover who often plays tennis in the tennis Center.</p>
    
    </div>`,



   
    location: {
      center: [-73.847933, 40.7501705],
      zoom: 17,
      pitch: 65,
      bearing: 0
    },
    onChapterEnter: [




      { callback: "showToxicTextbox" },
      { callback: "hideFloodVulnerabilityLayer_20250429" },


 
      
    ],
    onChapterExit: [


      




    ]
    
    
  },
  {
    id: "flush-the flushing4",
    alignment: "center",
    title: "flush-the flushing4",
    description: `
    <div class="flush-the flushing">
     <br> </br>
    </div>,

    <div class="left-textbox">
     <h2>+ The resistance capacity of the neighborhood is insufficient</h2>

     <p3>Flushing Creek sits at the heart of a neighborhood surrounded by numerous environmentally hazardous sites and industrial facilities. 
     When flooding strikes, the area's weak resistance capacity becomes dangerously clear. 
     Stormwater doesn't just overwhelm the low-lying streets—it mixes with contaminants from waste storage yards, fuel depots, and abandoned lots. 
     As the creek overflows, it carries oil, heavy metals, and debris into nearby residential and commercial zones. With poor drainage infrastructure and minimal disaster preparedness, toxic runoff lingers, 
     increasing the risk of waterborne illnesses and even outbreaks of disease. 
     In communities already facing environmental injustice, this kind of flooding turns from a nuisance into a full-blown public health crisis.</p3>
    
    </div>`,



   
    location: {
      center: [-73.840, 40.7481296],
      zoom: 12,
      pitch: 0,
      bearing: 0
    },
    onChapterEnter: [
      { callback: "addFloodVulnerabilityLayer_20250429" },
      { callback: "showToxicLegend" },
      






 
      
    ],
    onChapterExit: [
     





    ]
    
    
  },
  {
    id: "Fushing-all-in-all",
    alignment: "center",
    title: "Fushing-all-in-all",
    description: `


    <div class="center-textbox">
     <h2>+ For Tomorrow Flushing Creek +</h2>
      <img src="./img/long-collage-final.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />

     <p class="long-collage">
     What have we done?
     <br>
     What are we doing?
     <br>
     What should we doing?</p>
    

    

    </div>`,



   
    location: {
      center: [-73.840, 40.7481296],
      zoom: 12,
      pitch: 0,
      bearing: 0
    },
    onChapterEnter: [
      { callback: "hideToxicLegend" },






 
      
    ],
    onChapterExit: [





    ]
    
    
  },
  {
    id: "Fushing-all-in-all2",
    alignment: "center",
    title: "Fushing-all-in-all2",
    description: `


   <div class="center2-textbox">
     <h2>+ The Organization Focusing on Ecological Protection +</h2>
     <img src="./img/LOGO.png" alt="Sources of Waste Legend" style="width: 100%; height: auto;" />
     <div class="link-container">
       <a href="https://www.riverkeeper.org/">RIVERKEEPER</a>
       <a href="https://www.guardiansofflushingbay.org/">GUARDIANS-OF-FLUSHING-BAY</a>
       <a href="http://waterkeeper.org/">WATERKEEPER</a>
     </div>
     <br>
     <br>
     <br>
     <br>
     <br>
     <br>
     <br>
     <div class="more-info">
        <h3>+ Data Source +</h3>
       <a href="https://experience.arcgis.com/experience/6a3da7b920f248af961554bdf01d668b/page/Data-Explorer">EJNYC</a> | 
       <a href="https://opendata.cityofnewyork.us/">NYC OpenData</a> | 
       <a href="https://data.riverkeeper.org/water-quality/hudson-river/">Riverkeeper Water Quality Data</a>
     </div>
     <br>
     <br>
     <br>
     <div class="footer">
        Send me a message <a href="mailto:dd1102714218@gmail.com">Haoyuan Kuang</a>, <a href="mailto:zl973@cornell.edu">Zekun Liu</a> or visit
        <a href="https://dingdang-k.github.io/test-site-1/">my site</a>. |
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>
   </div>`,



   
    location: {
      center: [-73.840, 40.7481296],
      zoom: 12,
      pitch: 0,
      bearing: 0
    },
    onChapterEnter: [
      { callback: "hideToxicLegend" },






 
      
    ],
    onChapterExit: [





    ]
    
    
  },
  
 


  ];
  
  export default config;
  