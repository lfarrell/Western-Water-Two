import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Map from '@/components/Map'
import Arizona from '@/components/Arizona'
import California from '@/components/California'
import Colorado from '@/components/Colorado'
import Idaho from '@/components/Idaho'
import New_Mexico from '@/components/New_Mexico'
import Nevada from '@/components/Nevada'
import Oregon from '@/components/Oregon'
import Texas from '@/components/Texas'
import Utah from '@/components/Utah'
import Washington from '@/components/Washington'
import Wyoming from '@/components/Wyoming'
import About from '@/components/About'


Vue.use(Router);

export default new Router({
  routes: [
   /* {
      path: '/',
      name: 'Hello',
      component: Hello
    }, */
    {
      name: 'MainMap',
      path: '/',
      props: {
        dataFile: 'all_resv.csv',
        mapFile: 'contig_us.geo.json',
        resFile: 'all.csv',
        res: 'Shasta Dam',
        hasKey: true
      },
      component: Map
    },
    {
      name: 'Arizona',
      path: '/arizona',
      component: Arizona
    },
    {
      name: 'California',
      path: '/california',
      component: California
    },
    {
      name: 'Colorado',
      path: '/colorado',
      component: Colorado
    },
    {
      name: 'Idaho',
      path: '/idaho',
      component: Idaho
    },
    {
      name: 'Nevada',
      path: '/nevada',
      component: Nevada
    },
    {
      name: 'New Mexico',
      path: '/new_mexico',
      component: New_Mexico
    },
    {
      name: 'Oregon',
      path: '/oregon',
      component: Oregon
    },
    {
      name: 'Texas',
      path: '/texas',
      component: Texas
    },
    {
      name: 'Utah',
      path: '/utah',
      component: Utah
    },
    {
      name: 'Washington',
      path: '/washington',
      component: Washington
    },
    {
      name: 'Wyoming',
      path: '/wyoming',
      component: Wyoming
    },
    {
     path: '/about',
     name: 'About',
     component: About
     }

  ]
})
