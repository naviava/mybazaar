interface Props {
  params: { tempUserId: string };
}

export default function ConfirmRegistrationPage({ params }: Props) {
  const { tempUserId } = params;

  return <div>{tempUserId}</div>;
}
