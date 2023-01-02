import { useRouter } from "next/router";

export default function Customer() {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  return (
    <>
      <div>
        <h4>Customer {id}</h4>
      </div>
    </>
  );
}
