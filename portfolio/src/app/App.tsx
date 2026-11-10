import { Layout } from '../components/Layout';
import { activeSections } from './sections';
export function App() { return <Layout>{activeSections().map(({ id, component: Section }) => <Section key={id} id={id}/>)}</Layout>; }
