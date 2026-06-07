import Image from "next/image";
import type { Practitioner } from "@/content/equipe";

type Props = {
  member: Practitioner;
};

export default function TeamCard({ member }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="relative aspect-square w-full bg-surface">
        <Image
          src={member.photo}
          alt={`Portrait de ${member.name}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-kinesis-violet">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-kinesis-grey">
          {member.role}
        </p>
        <p className="mt-0.5 text-sm text-kinesis-green">{member.specialty}</p>
        {member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-kinesis-grey">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}
