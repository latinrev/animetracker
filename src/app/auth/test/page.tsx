import ActionButton from "@/components/ActionButton";

export default async function Tst({ ...props }) {
  console.log(props);
  async function testAction(data) {
    "use server";
    console.log(data);
  }
  return (
    <>
      <form action={testAction}>
        <input type="text" name="fuck" />
        <ActionButton action={testAction} buttonText="what" isForm={true} className="text-white" />
      </form>
    </>
  );
}
