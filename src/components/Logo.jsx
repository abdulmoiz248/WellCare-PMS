import Image from 'next/image';

export default function Logo() {
  return (
    <div className="size-20 dark:text-violet-600">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={200}
        height={200}
        className="rounded-full border-2 border-gray-300"
      />
    </div>
  );
}
