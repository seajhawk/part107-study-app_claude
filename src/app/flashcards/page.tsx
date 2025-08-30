import Layout from '@/components/Layout';
import SuspenseWrapper from '@/components/SuspenseWrapper';
import FlashcardsPageContent from '@/components/FlashcardsPageContent';

export default function FlashcardsPage() {
  return (
    <Layout>
      <SuspenseWrapper>
        <FlashcardsPageContent />
      </SuspenseWrapper>
    </Layout>
  );
}