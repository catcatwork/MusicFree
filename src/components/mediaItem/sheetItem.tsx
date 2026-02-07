import React from "react";
import { StyleSheet, View } from "react-native";
import rpx from "@/utils/rpx";
import { ROUTE_PATH, useNavigate } from "@/core/router";
import ImageBtn from "../base/imageBtn";
import { useI18N } from "@/core/i18n";

interface ISheetItemProps {
    pluginHash: string;
    sheetInfo: IMusic.IMusicSheetItemBase;
}

const marginBottom = rpx(16);

export default function SheetItem(props: ISheetItemProps) {
    const { sheetInfo, pluginHash } = props ?? {};
    const navigate = useNavigate();
    const { t } = useI18N();
    
    return (
        <View style={style.imageWrapper}>
            <ImageBtn
                accessible
                accessibilityLabel={t("a11y.recommendSheets.sheetItem", {
                    name: sheetInfo?.title,
                })}
                accessibilityRole="button"
                style={{
                    marginBottom,
                }}
                uri={sheetInfo?.artwork ?? sheetInfo?.coverImg}
                title={sheetInfo?.title}
                onPress={() => {
                    navigate(ROUTE_PATH.PLUGIN_SHEET_DETAIL, {
                        pluginHash,
                        sheetInfo,
                    });
                }}
            />
        </View>
    );
}
const style = StyleSheet.create({
    imageWrapper: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
