import React, { ReactNode } from 'react'
import ArtTrackIcon from '@mui/icons-material/ArtTrack'/* 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import ContactSupportIcon from '@mui/icons-material/ContactSupport' */

interface Data {
  title: string
  description: string
  icon?: ReactNode
}

export const data: Data[] = [
  {
    title: 'step 1',
    description:
      'Create an eye-catching advertisement with the help of our creative design team, our side wraps are designed with impact in mind, ensuring maximum exposure once your ad hits the road',
    icon: <ArtTrackIcon />,
  },
  {
    title: 'Step 2',
    description:
      "Leverage adyssey's fleet of trucks to reach your target market with our attention grabbing advertisement once your campaign goes live, our trucks act as mobile billboards standing at high level with your newest customer",
    icon: <ArtTrackIcon />,
  },
  {
    title: 'step 3',
    description: "Reporting on your ROI of the truck. Adyssey's technology allows for solid attribution levels for the impact of your OOH ad",
    icon: <ArtTrackIcon />,
  },
]
