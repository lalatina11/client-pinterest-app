
interface Props {
  title: string;
  description?: string;
}

const Metadata = (props: Props) => {
  const { title, description } = props;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description || ""} />
    </>
  );
};

export default Metadata;
