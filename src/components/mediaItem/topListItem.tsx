import React from "react";
// import {ROUTE_PATH, useNavigate} from '@/entry/router';
import ListItem from "@/components/base/listItem";
import { ImgAsset } from "@/constants/assetsConst";
import { ROUTE_PATH, useNavigate } from "@/core/router";
import { useI18N } from "@/core/i18n";

interface ITopListResultsProps {
    pluginHash: string;
    topListItem: IMusic.IMusicSheetItemBase;
}

export default function TopListItem(props: ITopListResultsProps) {
    const { pluginHash, topListItem } = props;
    const navigate = useNavigate();
    const { t } = useI18N();

    return (
        <ListItem
            accessible
            accessibilityLabel={t("a11y.topList.boardItem", {
                name: topListItem.title,
            })}
            accessibilityRole="button"
            withHorizontalPadding
            onPress={() => {
                navigate(ROUTE_PATH.TOP_LIST_DETAIL, {
                    pluginHash: pluginHash,
                    topList: topListItem,
                });
            }}>
            <ListItem.ListItemImage
                accessible={false}
                uri={topListItem?.coverImg}
                fallbackImg={ImgAsset.albumDefault}
            />
            <ListItem.Content
                accessible={false}
                title={topListItem.title}
                description={`${topListItem.description ?? ""}`}
            />
        </ListItem>
    );
}
