import { ITests } from "../../types"
import type { RootState } from "../index"

export const getUserName = (state: RootState): string => state.auth.user?.name || ""
export const getTests = (state: RootState): ITests[] => state.tests.testsList
