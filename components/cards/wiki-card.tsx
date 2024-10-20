"use client"

import { ReactNode } from "react"
import Image from "next/image"

import { ProjectInterface, ProjectSectionLabelMapping } from "@/lib/types"
import { cn, removeProtocol } from "@/lib/utils"
import { useTranslation } from "@/app/i18n/client"

import { AppLink } from "../app-link"
import { ThemesStatusMapping } from "../project/project-filters-bar"
import { Card } from "./card"

interface WikiDetailProps {
  label: string
  value?: ReactNode
}

interface WikiCardProps {
  lang?: string
  project: ProjectInterface
  className?: string
}

interface WikiLinkProps {
  href: string
  external?: boolean
  children: ReactNode
}

const WikiDetail = ({ label, value }: WikiDetailProps) => {
  if (!value) return null

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[90px_1fr] md:items-start md:gap-5">
      <div className="break-all font-sans text-xs font-bold leading-[14px] text-black">
        {label}
      </div>
      {typeof value === "string" ? (
        <span className="font-sans text-xs font-normal leading-[18px] text-black">
          {value}
        </span>
      ) : (
        <div className="break-all">{value}</div>
      )}
    </div>
  )
}

const WikiLink = ({ href, external, children }: WikiLinkProps) => {
  return (
    <AppLink
      className="duration-200 text-anakiwa-500 hover:text-anakiwa-700"
      href={href}
      external={external}
    >
      <span className="text-xs leading-[14px]">{children}</span>
    </AppLink>
  )
}

export const WikiCard = ({
  project,
  className = "",
  lang = "en",
}: WikiCardProps) => {
  const { t } = useTranslation(lang, "common")
  const statusItem = ThemesStatusMapping(lang)

  const { website } = project.links ?? {}

  const projectFunding = ProjectSectionLabelMapping[project?.section]
  const { label: projectStatus } = statusItem?.[project?.projectStatus] ?? {}
  const builtWithKeys: string[] = project?.tags?.builtWith ?? []
  const previousBrandImage = project?.previousBrandImage

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="mx-auto flex max-w-[290px] flex-col gap-6">
        <Card className="bg-white" padding="none">
          <div className="relative flex h-[140px] items-center justify-center overflow-hidden rounded-t-lg">
            <Image
              src={`/project-banners/${
                project.image ? project.image : "fallback.webp"
              }`}
              alt={`${project.name} banner`}
              width={290}
              height={140}
              className="bg-cover "
            />
            {!project?.image && (
              <span className="absolute w-full px-5 text-3xl font-bold text-center text-black -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                {project?.imageAlt || project?.name}
              </span>
            )}
          </div>
          <div className="gap-[10px] px-6 py-4 md:flex md:flex-col">
            <WikiDetail
              label={t("filterLabels.projectStatus")}
              value={projectStatus}
            />
            {builtWithKeys?.length > 0 && (
              <WikiDetail
                label={t("filterLabels.builtWith")}
                value={
                  <div className="flex flex-col gap-1 ">
                    {builtWithKeys.map((key) => (
                      <WikiLink
                        href={`/${lang}/projects?builtWith=${key}`}
                        key={key}
                      >
                        {key}
                      </WikiLink>
                    ))}
                  </div>
                }
              />
            )}
            <WikiDetail
              label={t("filterLabels.funding")}
              value={projectFunding}
            />
            <WikiDetail
              label={t("filterLabels.license")}
              value={project?.license}
            />
            {website && (
              <WikiDetail
                label="Website"
                value={
                  <WikiLink href={website} external>
                    {removeProtocol(website)}
                  </WikiLink>
                }
              />
            )}
          </div>
        </Card>
        {previousBrandImage && (
          <Card padding="none">
            <div className="relative flex max-h-[140px] items-center justify-center overflow-hidden rounded-t-lg ">
              <Image
                src={`/project-banners/${previousBrandImage}`}
                alt={`${project.name} banner`}
                width={290}
                height={140}
                className="bg-cover "
              />
              {!project?.image && (
                <span className="absolute w-full px-5 text-3xl font-bold text-center text-black -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                  {project?.imageAlt || project?.name}
                </span>
              )}
            </div>
            <div className="flex items-center justify-center py-4 bg-white">
              <span className="text-xs font-normal text-black">
                {t("prevBrandImage")}
              </span>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
