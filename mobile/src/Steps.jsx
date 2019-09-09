
import C from './Constants'

import AI from './scene/AI'
import Done from './scene/Done'
import ESI from './scene/ESI'
import HopeSignal from './scene/HopeSignal'
import NormalSignal from './scene/NormalSignal'
import NoSignal from './scene/NoSignal'
import Splash from './scene/Splash'
import SMS from './scene/SMS'
import USSD from './scene/USSD'
import Welcome from './scene/Welcome'

// [Component, Carrier, Connected, Network, Phone Button Active]
export const scenes = {
  0: [Splash, 'ACME Wireless', true, '4G', false],
  1: [Welcome, 'ACME Wireless', true, '4G', false],
  2: [NormalSignal, 'ACME Wireless', true, '4G', false],
  3: [NoSignal, 'No Network', false, 'X', false],
  4: [HopeSignal, 'Roaming', true, 'R', false],
  5: [USSD, 'Roaming', true, 'R', true],
  6: [ESI, 'Roaming', true, 'R', false],
  7: [AI, 'Roaming', true, 'R', false],
  8: [SMS, 'Roaming', true, 'R', false],
  9: [Done, 'Roaming', true, 'R', false],
}

export const texts = {
  0: 'Click on Start to begin the simulator.',
  1: 'The HopeBox is a decentralized real-time long-range emergency communications base station and mesh network that enables first responders, volunteers, government agencies, humanitarian organizations and the community to coordinate more efficient and organize relief efforts with real-time GIS maps, community status updates, text messaging, emergencry responder task and checklist, automated drone tracking, and more.',
  2: 'It\'s a blend of emerging and existing technologies in ICT, blockchain, AI, IoT, Lora Mesh, LoraWAN, software defined radio, blockchain, arduino, cryptography autonomous drones, automation, and more.',
  3: 'When a natural disaster like an earthquake or hurricane strike, communication systems break down, hope is lost, and relief efforts face an enormous amount of challenges.',
  4: 'When Disasters or Emergencies strike like earthquakes, hurricanes, tornadoes, or attacks; the HopeBox Hardware and Software system provides a 24/7 Rugged Decentralized Mesh Communicaiton and connectivity Network for First Responders, Volunteers, City Officials, and the Community',
  5: 'Future partnerships offering the ability to send a text message to reach 911 or 112 emergency call takers from your mobile phone or device',
  6.1: 'Disaster and Emergency Relief Management System before, during and after Earthquakes, Hurricanes, Volcanoes, Tornadoes, Flooding, Fires, Droughts, attacks on private and public safety',
  6.2: 'SAR teams can quickly launch a drone carrying the smaller HopeBox SARBox where a Radio Frequency Phone Locator, Communication Network Repeater, a camera with extended zoom and a thermal camera are able to perform quick sweeps of areas as large as a few square miles. In the future a swarm of autonomous drones will provide advanced Search and Rescue missions and help save lives when SAR teams or First Responders or both are short-handed.',
  7: 'The AI can process natural language and provide important information that could save lives.',
  8: 'HopeBox\'s AI acts as a Computer Aided Dispatcher that can also help aleviate pressure in high volume situations.',
  9: `If you haven\'t already please take a look at the field deployed user interface for command and control operations at <a href="${C.HOME_URL}">${C.HOME_URL}</a>`,
}

export const ussd = 5

export default {
  scenes,
  texts,
  ussd,
}
