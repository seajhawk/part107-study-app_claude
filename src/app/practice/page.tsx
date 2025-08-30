import Layout from '@/components/Layout';
import SuspenseWrapper from '@/components/SuspenseWrapper';
import PracticePageContent from '@/components/PracticePageContent';

export default function PracticePage() {
  return (
    <Layout>
      <SuspenseWrapper>
        <PracticePageContent />
      </SuspenseWrapper>
    </Layout>
  );
}