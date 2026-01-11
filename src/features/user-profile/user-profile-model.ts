import { prisma } from "../../../lib/prisma";
import type { Prisma, UserProfile } from "../../generated/prisma/client";

/* CREATE */

/**
 * Сохраняет профиль пользователя в БД.
 *
 * @param userProfile Профиль пользователя для сохранения.
 * @returns Сохраненный профиль пользователя.
 */
export async function saveUserProfileToDatabase(
  userProfile: Prisma.UserProfileCreateInput,
) {
  return prisma.userProfile.create({ data: userProfile });
}

/* READ */

/**
 * Извлекает профиль пользователя по его id.
 *
 * @param id Идентификатор профиля пользователя.
 * @returns Профиль пользователя или `null`.
 */
export async function retrieveUserProfileFromDatabaseById(
  id: UserProfile["id"],
) {
  return prisma.userProfile.findUnique({ where: { id } });
}

/**
 * Извлекает профиль пользователя по его email.
 *
 * @param email email профиля пользователя.
 * @returns Профиль пользователя или `null`.
 */
export async function retrieveUserProfileFromDatabaseByEmail(
  email: UserProfile["email"],
) {
  return prisma.userProfile.findUnique({ where: { email } });
}

/**
 * Извлекает несколько профилей пользователей.
 *
 * @param page Номер страницы (начиная с 1).
 * @param pageSize Количество профилей на страницу.
 * @returns Список профилей пользователей.
 */
export async function retrieveManyUserProfilesFromDatabase({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) {
  const skip = (page - 1) * pageSize;
  return prisma.userProfile.findMany({
    skip,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}

/* UPDATE */

/**
 * Обновляет профиль пользователя по его id.
 *
 * @param id Идентификатор профиля пользователя.
 * @param data Новые данные профиля.
 * @returns Обновленный профиль пользователя.
 */
export async function updateUserProfileInDatabaseById({
  id,
  data,
}: {
  id: UserProfile["id"];
  data: Prisma.UserProfileUpdateInput;
}) {
  return prisma.userProfile.update({ where: { id }, data });
}

/* DELETE */

/**
 * Удаляет профиль пользователя по его id.
 *
 * @param id Идентификатор профиля пользователя.
 * @returns Удаленный профиль пользователя.
 */
export async function deleteUserProfileFromDatabaseById(id: UserProfile["id"]) {
  return prisma.userProfile.delete({ where: { id } });
}
